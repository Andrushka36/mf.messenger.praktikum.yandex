import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { Messages } from '../Messages';
import { MessageForm } from '../MessageForm';
import { ChatHeader } from '../ChatHeader';
import { router } from '../../lib/Router';
import { chatsDTO } from '../../api/chatsDTO';
import { chatsStore, userStore } from '../../stores';
import { WebSocketService } from '../../lib/WebSocketService';
import { ChatHistoryItemType, ChatMessageType } from '../../models/chats';
import { isEqual } from '../../utils/isEqual';
import { convertFromAPIResponse } from '../../utils/convertAPIResponse';
import './styles.sass';

export class Chat extends Component<{}> {
    chatHeader!: ChatHeader;

    messageForm!: MessageForm;

    socket: WebSocketService | null = null;

    messageList: ChatHistoryItemType[] = [];

    messages!: Messages;

    loading: boolean = false;

    prerender() {
        this.chatHeader = new ChatHeader();

        this.messageForm = new MessageForm({});

        this.messages = new Messages({
            scrollToLast: false,
            loading: false,
            messages: [],
        });
    }

    onMessageSubmit = (message: string) => {
        if (this.socket !== undefined) {
            this.socket?.send('message', { message });
        }
    }

    render() {
        return templator.compile(template, {
            header: this.chatHeader,
            messages: this.messages,
            messageForm: this.messageForm,
        });
    }

    updateMessages(newMessages: ChatHistoryItemType[], scrollToLast: boolean = false) {
        if (!isEqual(newMessages, this.messageList)) {
            this.messageList = [...newMessages];

            this.messages.setProps({
                scrollToLast,
                loading: false,
                messages: this.messageList,
            });

            if (newMessages.length === 0) {
                return;
            }
        } else if (this.loading) {
            this.loading = false;

            this.messages.setProps({
                scrollToLast: false,
                loading: false,
            });
        }
    }

    onMessage(data: ChatMessageType | ChatHistoryItemType[], chatId: string) {
        if (Array.isArray(data)) {
            const convertedData = convertFromAPIResponse<ChatHistoryItemType[]>(data);
            if (convertedData.length === 0) {
                this.updateMessages([...this.messageList, ...convertedData]);
            } else {
                const lastCurrentMessage = this.messageList[this.messageList.length - 1];
                const lastCurrentMessageTime = lastCurrentMessage && new Date(lastCurrentMessage.time);
                const firstNewMessage = convertedData[0];
                const firstNewMessageTime = firstNewMessage && new Date(firstNewMessage.time);

                if (lastCurrentMessageTime === undefined || firstNewMessageTime?.valueOf() < lastCurrentMessageTime.valueOf()) {
                    const shouldScrollToLast = this.messageList.length === 0;

                    this.updateMessages([...this.messageList, ...convertedData], shouldScrollToLast);
                }
            }
        } else {
            const {
                content,
                id,
                time,
                type,
                userId,
            } = data;

            // "Почему тут есть проверка на typa, а массив сверху не проверяется?"
            // а прикол в том что по сокетам в качестве ответов прилетают данные в разных форматах
            // если я запрашиваю список сообщений, то мне прилетает просто массив
            // если я отправляю сообщение, то ответ приходит в виде { type: "message", <свойства сообщения> }
            // если бы ответ был в едином формате, я бы, конечно, сделал какой-нибудь метод в WebSocketService
            // который принимал бы тип сообщения и коллбек
            // и соответственно в зависимости от типа полученного сообщения вызывался бы определенный коллбек
            // но поскольку ответы такие кривые прилетают, то приходится такое не очень красивое решение писать
            // в принципе, наверное, стоит об этом в обратной связи по итогам 1ого модуля написать?

            if (type === 'message') {
                this.updateMessages([{ content, id, time, chatId: Number(chatId), userId }, ...this.messageList], true);

                this.updateNewMessageCount(Number(chatId));
            }
        }
    }

    createSocketConnection(token: string, userId: number, chatId: string) {
        this.socket = new WebSocketService(`/ws/chats/${userId}/${chatId}/${token}`);

        this.socket.onopen(() => {
            this.socket?.send('get old', { message: '0' });

            this.messages.setProps({
                getOldMessages: (messages: ChatHistoryItemType[]) => {
                    this.socket?.send('get old', { message: String(messages.length) });
                },
            });

            this.messageForm.setProps({
                onSubmit: this.onMessageSubmit,
            });
        });

        this.socket.onclose(() => {
            this.createSocketConnection(token, userId, chatId);
        });

        this.socket.onmessage<ChatMessageType | ChatHistoryItemType[]>((data) => {
            this.onMessage(data, chatId);
        });
    }

    updateNewMessageCount(id: number) {
        const chatId = router.getCurrentParam() as string;

        if (chatId !== String(id)) {
            const chats = chatsStore.getData().slice();
            const chatIndex = chats.findIndex(c => c.id === id);
            const chat = chats[chatIndex];

            chats[chatIndex] = { ...chat, newMessage: chat.newMessage + 1 };

            chatsStore.setData(chats);
        }
    }

    componentDidMount() {
        this.messageList = [];

        this.loading = true;

        this.messages.setProps({
            loading: true,
            messages: this.messageList,
            scrollToLast: false,
        });

        const chatId = router.getCurrentParam() as string;

        if (chatId !== undefined && this.socket === null) {
            chatsDTO
                .get(`token/${chatId}`)
                .create()
                .then((res: any) => {
                    const { token } = JSON.parse(res);

                    const { id: userId } = userStore.getData();

                    this.createSocketConnection(token, userId, chatId);
                });
        }
    }
}
