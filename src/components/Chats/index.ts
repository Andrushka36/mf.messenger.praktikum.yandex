import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChats } from './interfaces';
import { Modal } from '../Modal';
import { chatsDTO } from '../../api/chatsDTO';
import { errorHandler } from '../../lib/ErrorHandler';
import { ChatItem } from '../ChatItem';
import { ChatModalContent } from '../ChatModalContent';
import { router } from '../../lib/Router';
import { Chat } from '../Chat';
import { SelectChat } from '../SelectChat';
import { ChatType } from '../../models/chats';
import { chatsStore } from '../../stores';
import { getAvatarPath } from '../../utils/getAvatarPath';
import './styles.sass';

export class Chats extends Component<IChats> {
    chatCreateModal!: Modal;

    chatItems: ChatItem[] = [];

    searchValue: string = '';

    prerender() {
        const chatCreate = new ChatModalContent({
            inputName: 'title',
            placeholder: 'Название чата',
            value: '',
        });

        this.chatCreateModal = new Modal({
            confirmText: 'Создать',
            content: chatCreate,
            onConfirm: (component: Modal) => {
                const formData = new FormData((component.element as HTMLElement).querySelector('form') as HTMLFormElement);
                const title = formData.get('title') as string | null;

                if (title !== null && title.length > 0) {
                    chatsDTO
                        .create({ title })
                        .then((res: any) => {
                            chatCreate.setProps({
                                value: '',
                            });

                            const { id } = JSON.parse(res);

                            router.go(`/chats/${id}`);
                        })
                        .then()
                        .catch(({ status }) => {
                            errorHandler.handle(status);
                        });
                }
            },
            title: 'Создание чата',
        });
    }

    render() {
        const chatId = router.getCurrentParam();

        return templator.compile(template, {
            ...this.props,
            areChatsExist: this.chatItems?.length !== 0,
            chatItems: this.chatItems,
            chatCreateModal: this.chatCreateModal,
            content: chatId ? new Chat() : new SelectChat(),
            onChange: ({ target }: Event) => {
                const { value } = target as HTMLInputElement;

                this.searchValue = value;

                this.renderChats(value);
            },
            onCreateChatButtonClick: () => {
                this.chatCreateModal.show('flex');
            },
            searchValue: this.searchValue,
        });
    }

    renderChats(title: string = '') {
        const chats = chatsStore.getData();
        const chatId = router.getCurrentParam();
        const regexp = new RegExp(title);

        this.chatItems = chats
            .slice()
            .reverse()
            .filter(({ title }) => regexp.test(title))
            .map(({ avatar, id, newMessage, title }) => {
                return new ChatItem({
                    avatar: getAvatarPath(avatar),
                    id,
                    newMessage,
                    open: chatId !== undefined ? Number(chatId) === id : false,
                    title,
                });
            });

        this.forceUpdate();
    }

    fetchChats() {
        return chatsDTO
            .find()
            .then((res: any) => {
                const data = JSON.parse(res) as ChatType[];

                chatsStore.setData(data);

                return data;
            });
    }

    getNewMessagesCount() {
        const chats = chatsStore.getData();

        return Promise.all(
            chats.map(({ id }) => {
                return chatsDTO
                    .get(`new/${id}`)
                    .find()
                    .then((res: any) => {
                        const { unread_count } = JSON.parse(res);

                        return unread_count;
                    });
            })
        )
            .then(res => {
                chatsStore.setData(chats.map((c, index) => ({ ...c, newMessage: res[index] })));
            });
    }

    chatsChangeHandler = () => {
        this.renderChats();
    }

    componentDidMount() {
        chatsStore.addChangeListener(this.chatsChangeHandler);

        this.fetchChats()
            .then(() => {
                return this.getNewMessagesCount();
            });
    }

    // TODO: Убрать после написания Virtual DOM
    componentDidUpdate() {
        const searchInput = document.querySelector<HTMLInputElement>('.js-chats-search-input');

        if (searchInput !== null && this.searchValue.length > 0) {
            searchInput.focus();
            searchInput.selectionStart = (this.searchValue.length);
        }
    }

    componentWillUnmount() {
        chatsStore.removeChangeListener(this.chatsChangeHandler);
    }
}
