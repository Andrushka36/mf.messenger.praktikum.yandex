export type ChatType = {
    avatar: string;
    id: number;
    title: string;
    newMessage: number;
}

export type ChatHistoryItemType = {
    chat_id: number;
    content: string;
    id: number;
    time: string;
    user_id: number;
}

export type ChatMessageType = {
    content: string;
    id: number;
    time: string;
    type: string;
    userId: number;
}

export enum MessageType {
    INCOMING = 'incoming',
    OUTGOING = 'outgoing',
}

export enum MessageStatus {
    READ = 'read',
    SENT = 'sent',
}
