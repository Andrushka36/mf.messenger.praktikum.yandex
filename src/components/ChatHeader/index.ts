import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { ChatActions } from '../ChatActions';
import { ChatActionsItem } from '../ChatActionsItem';
import { AddUserIcon } from '../../assets/AddUserIcon';
import { DeleteUserIcon } from '../../assets/DeleteUserIcon';
import { DeleteIcon } from '../../assets/DeleteIcon';
import { ChatActionsModal } from '../ChatActionsModal';
import { ActionsIcon } from '../../assets/ActionsIcon';
import { ChatActionsButton } from '../ChatActionsButton';
import { Modal } from '../Modal';
import { chatsDTO } from '../../api/chatsDTO';
import { router } from '../../lib/Router';
import { errorHandler } from '../../lib/ErrorHandler';
import { ChatModalContent } from '../ChatModalContent';
import { userDTO } from '../../api/userDTO';
import { ChatUserResponseType, UserResponseType } from '../../models/profile';
import { ChatAddUsersItem } from '../ChatAddUsersItem';
import { getAvatarPath } from '../../utils/getAvatarPath';
import { chatsStore } from '../../stores';
import { ImageIcon } from '../../assets/ImageIcon';

export class ChatHeader extends Component<{}> {
    actionsButton!: ChatActionsButton;

    actionsModal!: ChatActionsModal;

    addUsersModal!: Modal;

    chatDeleteUsers!: ChatModalContent;

    chatId: string = '';

    deleteChatModal!: Modal;

    deleteUsersModal!: Modal;

    avatar: string | null = null;

    title: string = '';

    prerender() {
        const chatActions = new ChatActions({
            buttons: [
                new ChatActionsItem({
                    icon: new AddUserIcon(),
                    label: 'Добавить пользователя',
                    onClick: () => {
                        this.addUsersModal.visibilityToggle('flex');
                    },
                }),
                new ChatActionsItem({
                    icon: new DeleteUserIcon(),
                    label: 'Удалить пользователя',
                    onClick: () => {
                        this.deleteUsersModal.visibilityToggle('flex');
                    },
                }),
                new ChatActionsItem({
                    icon: new ImageIcon(),
                    label: 'Изменить аватарку',
                    onClick: this.addAvatar,
                }),
                new ChatActionsItem({
                    icon: new DeleteIcon(),
                    label: 'Удалить чат',
                    onClick: () => {
                        this.deleteChatModal.visibilityToggle('flex');
                    },
                }),
            ],
        });

        this.actionsModal = new ChatActionsModal({
            content: chatActions,
            x: 'right',
            y: 'bottom',
        });

        const actionsIcon = new ActionsIcon();

        this.actionsButton = new ChatActionsButton({
            className: 'chat-header__actions',
            icon: actionsIcon,
            onClick: () => {
                this.actionsModal.visibilityToggle();
            },
            title: 'Действия с чатом',
        });

        this.deleteChatModal = new Modal({
            confirmText: 'Удалить',
            title: 'Вы хотите удалить чат?',
            onConfirm: () => {
                const chatId = router.getCurrentParam();

                chatsDTO
                    .delete({ chatId: Number(chatId) })
                    .then(() => {
                        router.go('/');
                    })
                    .catch(({ status }) => {
                        errorHandler.handle(status);
                    });
            },
        });

        const initialChatAddUsersProps = {
            value: '',
            users: [],
        };

        let chatAddUsersTimerId: any = null;

        const chatAddUsers = new ChatModalContent({
            inputName: 'login',
            placeholder: 'Логин',
            onChange: ({ target }: Event) => {
                if (chatAddUsersTimerId !== null) {
                    clearTimeout(chatAddUsersTimerId);
                }

                const { value } = target as HTMLInputElement;

                chatAddUsersTimerId = setTimeout(() => {
                    userDTO
                        .get('search')
                        .create({
                            login: value,
                        })
                        .then((res: any) => {
                            const users = JSON.parse(res) as UserResponseType[];

                            chatAddUsers.setProps({
                                users: users.map(({
                                    display_name,
                                    first_name,
                                    id,
                                    login,
                                    second_name,
                                }) => new ChatAddUsersItem({
                                    display_name,
                                    first_name,
                                    id,
                                    login,
                                    second_name,
                                })),
                                value,
                            });
                        });
                }, 200);
            },
            ...initialChatAddUsersProps,
        });

        this.addUsersModal = new Modal({
            confirmText: 'Добавить',
            content: chatAddUsers,
            title: 'Добавление пользователей',
            onConfirm: (component: Component) => {
                const formData = new FormData((component.element as HTMLElement).querySelector('form') as HTMLFormElement);
                const users = formData.getAll('id');

                if (users.length === 0) {
                    return;
                }

                chatsDTO
                    .get('users')
                    .update({
                        users,
                        chatId: this.chatId,
                    })
                    .then(() => {
                        chatAddUsers.setProps({ ...initialChatAddUsersProps });
                        this.updateUsers();
                        component.hide();
                    })
                    .catch(({ status }) => {
                        errorHandler.handle(status);
                    });
            },
        });

        this.chatDeleteUsers = new ChatModalContent({});

        this.deleteUsersModal = new Modal({
            confirmText: 'Удалить',
            content: this.chatDeleteUsers,
            title: 'Удаление пользователей',
            onConfirm: (component: Component) => {
                const formData = new FormData((component.element as HTMLElement).querySelector('form') as HTMLFormElement);
                const users = formData.getAll('id');

                if (users.length === 0) {
                    return;
                }

                chatsDTO
                    .get('users')
                    .delete({
                        users,
                        chatId: this.chatId,
                    })
                    .then(() => {
                        this.updateUsers();
                        component.hide();
                    })
                    .catch(({ status }) => {
                        errorHandler.handle(status);
                    });
            },
        });
    }

    render() {
        return templator.compile(template, {
            actionsButton: this.actionsButton,
            actionsModal: this.actionsModal,
            addUsersModal: this.addUsersModal,
            avatar: getAvatarPath(this.avatar),
            deleteChatModal: this.deleteChatModal,
            deleteUsersModal: this.deleteUsersModal,
            title: this.title,
        });
    }

    updateUsers() {
        chatsDTO
            .get(`${this.chatId}/users`)
            .find()
            .then((res: any) => {
                const users = JSON.parse(res) as ChatUserResponseType[];

                this.chatDeleteUsers.setProps({
                    users: users.map(({
                        display_name,
                        first_name,
                        id,
                        login,
                        second_name,
                    }) => new ChatAddUsersItem({
                        display_name,
                        first_name,
                        id,
                        login,
                        second_name,
                    })),
                });
            })
            .catch(({ response }) => {
                const { reason } = JSON.parse(response) as { reason: string };
                if (reason === 'No chat') {
                    router.go('/');
                }
            });
    }

    componentDidMount() {
        this.chatId = router.getCurrentParam() as string;

        const chat = chatsStore.getData().find(({ id }) => id === Number(this.chatId));

        if (chat !== undefined) {
            const {
                avatar,
                title,
            } = chat;

            this.avatar = avatar;
            this.title = title;

            this.forceUpdate();
        }
        this.updateUsers();
    }

    addAvatar() {
        const input = document.createElement<'input'>('input');

        input.setAttribute('type', 'file');

        input.click();

        const listener = ({ target }: Event) => {
            const { files } = target as HTMLInputElement;

            const chatId = router.getCurrentParam();

            const formData = new FormData();
            formData.append('avatar', (files as FileList)[0]);
            formData.append('chatId', chatId as string);
            chatsDTO
                .get('avatar')
                .update(formData)
                .then(() => {
                    window.location.reload();
                });
        };

        input.addEventListener('change', listener, { once: true });
    }
}
