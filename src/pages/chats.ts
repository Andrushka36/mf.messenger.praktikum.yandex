import { Chats } from '../components/Chats';
import { ChatItem, IChatItem } from '../components/ChatItem';
import { SelectChat } from '../components/SelectChat';
import { NewMessage  } from '../components/NewMessage';
import { CharItemOutgoingMessage } from '../components/ChatItemOutgoingMessage';
import { render } from '../utils/render';
import { chatItemsData } from '../data/chatItemsData';

const selectChat = new SelectChat({});

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
    content: selectChat,
    onChange: (event: Event) => {
        const { target } = event;
        const { value } = target as HTMLInputElement;

        console.log(`search: ${value}`);
    },
    pageTitle: 'Выбор чата',
})


render('#root', chats);