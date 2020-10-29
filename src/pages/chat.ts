import { Chat } from '../components/Chat';
import { ChatActionsButton } from '../components/ChatActionsButton';
import { ChatActions } from '../components/ChatActions';
import { ChatActionsItem } from '../components/ChatActionsItem';
import { ChatActionsModal } from '../components/ChatActionsModal';
import { ChatInformation } from '../components/ChatInformation';
import { ChatRenameForm } from '../components/ChatRenameForm';
import { ChatHeader } from '../components/ChatHeader';
import { ChatItem } from '../components/ChatItem';
import { NewMessage } from '../components/NewMessage';
import { CharItemOutgoingMessage } from '../components/ChatItemOutgoingMessage';
import { Chats } from '../components/Chats';
import { ActionsIcon } from '../assets/ActionsIcon';
import { RenameIcon } from '../assets/RenameIcon';
import { DeleteIcon } from '../assets/DeleteIcon';
import { Messages } from '../components/Messages';
import { MessageForm } from '../components/MessageForm';
import { ChatDeleteModal } from '../components/ChatDeleteModal';
import { render } from '../utils/render';
import { chatItemsData } from '../data/chatItemsData';
import { IChatItem } from '../components/ChatItem/interfaces';

const renameFormToggle = () => {
    chatRenameForm.visibilityToggle('grid');
    chatInformation.visibilityToggle('grid');
}

const deleteModalToggle = () => {
    chatModalDelete.visibilityToggle('flex');
}

const renameIcon = new RenameIcon();
const deleteIcon = new DeleteIcon();

const chatActions = new ChatActions({
    buttons: [
        new ChatActionsItem({
            icon: renameIcon,
            label: 'Переименовать',
            onClick: renameFormToggle,
        }),
        new ChatActionsItem({
            icon: deleteIcon,
            label: 'Удалить',
            onClick: deleteModalToggle,
        }),
    ],
});

const chatActionsModal = new ChatActionsModal({
    content: chatActions,
    x: 'right',
    y: 'bottom'
});

const chatActionsModalToggle = () => {
    chatActionsModal.visibilityToggle();
}

const actionsIcon = new ActionsIcon();

const chatActionsButton = new ChatActionsButton({
    className: 'chat-header__actions',
    icon: actionsIcon,
    onClick: chatActionsModalToggle,
    title: 'Действия с чатом',
});

const chatRenameForm = new ChatRenameForm({
    onSubmit: renameFormToggle,
    title: 'Вадим',
});

const chatInformation = new ChatInformation({
    avatarAlt: 'Аватар беседы с Вадимом',
    avatarSrc: '/assets/avatar.jpg',
    chatActionsButton,
    chatActionsModal,
    chatName: 'Вадим',
    status: 'Был 5 минут назад',
});

const chatHeader = new ChatHeader({
    chatRenameForm,
    chatInformation,
});

const messages = new Messages();

const messageForm = new MessageForm();

const chatModalDelete = new ChatDeleteModal();

const chat = new Chat( {
    chatHeader,
    deleteModal: chatModalDelete,
    messages,
    messageForm,
});

const chatItems: ChatItem[] = chatItemsData.map(({ newMessage, incomingMessage, outgoingMessage, ...mainProps }) => {
    const props: Partial<IChatItem> = { ...mainProps };

    if (newMessage !== undefined) {
        props.newMessage = new NewMessage({ count: newMessage });
    }
    if (incomingMessage !== undefined) {
        props.chatMessage = incomingMessage;
    } else if (outgoingMessage !== undefined) {
        props.chatMessage = new CharItemOutgoingMessage({ message: outgoingMessage });
    }

    return new ChatItem({ ...props } as IChatItem);
});

const chats = new Chats({
    chatItems,
    content: chat,
    onChange: ({ target }: Event) => {
        const { value } = target as HTMLInputElement;

        console.log(`search: ${value}`);
    },
    pageTitle: 'Выбор чата',
});

render('#root', chats);