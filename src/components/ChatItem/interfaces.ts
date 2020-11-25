export interface IChatItem {
    /**
     * Путь к аватарке
     */
    avatar: string

    /**
     * Идентификатор чата
     */
    id: number;

    /**
     * Определяет, является ли открытым текущий чат
     */
    open: boolean;

    /**
     * Название чата
     */
    title: string;

    /**
     * Последнее входящее сообщение
     */
    incomingMessage?: string;

    /**
     * Количество новых сообщений в чате
     */
    newMessage?: number;

    /**
     * Последнее исходящее сообщение
     */
    outgoingMessage?: string;
}
