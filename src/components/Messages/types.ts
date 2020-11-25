import {
    ChatHistoryItemType,
    MessageStatus,
    MessageType,
} from '../../models/chats';

export interface IMessages {
    /**
     * Определяет статус загрузки сообщений
     */
    loading: boolean;

    /**
     * Список сообщений
     */
    messages: ChatHistoryItemType[];

    /**
     * Определяет необходимость проктутить страницу, чтобы последнее сообщение оказалось видимым
     */
    scrollToLast?: boolean;

    /**
     * Функция получения старых сообщений
     */
    getOldMessages?: (messages: ChatHistoryItemType[]) => void;
}

export interface IMappedMessage {
    content: string[];
    status?: MessageStatus;
    time: string;
    type: MessageType;
    userId: number;
}
