import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IMappedMessage, IMessages } from './types';
import { chatsStore, userStore } from '../../stores';
import { ChatHistoryItemType, MessageStatus, MessageType } from '../../models/chats';
import { getDate } from '../../utils/getDate';
import { getTime } from '../../utils/getTime';
import { Message } from '../Message';
import { MessageDate } from '../MessageDate';
import { MessageContent } from '../MessageContent';
import { Loader } from '../Loader';
import { NoMessages } from '../NoMessages';
import { users } from '../../lib/Users';
import { router } from '../../lib/Router';

export class Messages extends Component<IMessages> {
    messages: Component[] = [];

    loader!: Loader;

    observer: IntersectionObserver | null = null;

    constructor(props: IMessages) {
        super(props);
    }

    getType(id1: number, id2: number | undefined): MessageType {
        return id1 === id2 ? MessageType.OUTGOING : MessageType.INCOMING;
    }

    mapMessages(messages: ChatHistoryItemType[]): (string | IMappedMessage)[] {
        const { id } = userStore.getData();

        const res: (string | IMappedMessage)[] = [];

        messages
            .slice()
            .reverse()
            .forEach(({ user_id, time, content }, index, arr) => {
                const currentDate = getDate(time);
                const prevDate = getDate(arr[index - 1]?.time);

                if (currentDate !== prevDate) {
                    res.push(currentDate);
                }

                const currentTime = getTime(time);
                const prevTime = getTime(arr[index - 1]?.time);

                const currentType = this.getType(id, user_id);
                const prevType = this.getType(id, arr[index - 1]?.user_id);

                if (currentType === prevType && currentDate === prevDate && currentTime === prevTime) {
                    (res[res.length - 1] as IMappedMessage).content.push(content);
                } else {
                    const item = {
                        content: [content],
                        time: currentTime,
                        type: currentType,
                        userId: user_id,
                    };
                    if (currentType === MessageType.OUTGOING) {
                        res.push({ ...item, status: MessageStatus.READ });
                    } else {
                        res.push(item);
                    }
                }
            });

        return res;
    }

    mapMessagesToComponents(messages: (string | IMappedMessage)[]): (MessageDate | Message)[] {
        return messages.map(message => {
            if (typeof message === 'string') {
                return new MessageDate({ date: message });
            }
            const { content, status, time, type, userId } = message;

            const props = {
                content: content.map((text, index) => {
                    return new MessageContent({
                        text,
                        last: index === content.length - 1,
                    });
                }),
                time,
                type,
                user: '',
                userId,
            };

            if (type === MessageType.OUTGOING) {
                return new Message({
                    ...props,
                    status,
                });
            }
            return new Message(props);
        });
    }

    prerender() {
        this.loader = new Loader();
    }

    render() {
        const {
            loading,
            messages,
        } = this.props;

        const mappedMessages = this.mapMessages(messages);
        this.messages = this.mapMessagesToComponents(mappedMessages);

        return templator.compile(template, {
            loader: this.loader,
            loading,
            messages: this.messages.length > 0 ? this.messages : new NoMessages(),
        });
    }

    componentDidUpdate() {
        if (this.observer !== null) {
            this.observer.disconnect();
        }

        const {
            getOldMessages,
            messages,
            scrollToLast,
        } = this.props;

        Promise.all(this.messages.map(component => {
            if (component instanceof Message) {
                const { props: { userId } } = component;

                return users
                    .get(userId)
                    .then(({ first_name, second_name, display_name }) => {
                        const user = display_name || `${first_name} ${second_name}`;

                        component.setProps({ user });
                    });
            }
        })).then(() => {
            if (scrollToLast) {
                queueMicrotask(() => {
                    const m = document.querySelectorAll('li.message');
                    m[m.length - 1]?.scrollIntoView();
                });
            }
        });

        if (this.element instanceof HTMLElement) {
            this.observer = new IntersectionObserver(((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (this.messages.length !== 0 && getOldMessages !== undefined) {
                            getOldMessages(messages);
                        }
                    }
                });
            }));

            const element = this.element.querySelector('.js-load-messages');

            if (element instanceof HTMLElement) {
                this.observer.observe(element);
            }
        }

        this.clearNewMessageCount();
    }

    clearNewMessageCount() {
        const chats = chatsStore.getData();
        const chatId = router.getCurrentParam();
        const currentChatIndex = chats.findIndex(({ id }) => id === Number(chatId));
        const currentChat = chats[currentChatIndex];

        if (currentChat !== undefined && currentChat.newMessage > 0 && this.messages.length > 0) {
            const newChats = chats.slice();

            newChats[currentChatIndex] = { ...currentChat, newMessage: 0 };

            chatsStore.setData(newChats);
        }
    }

    componentWillUnmount() {
        if (this.observer !== null) {
            this.observer.disconnect();
        }
    }
}
