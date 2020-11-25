export interface IMessageContent {
    /**
     * Абзац сообщения
     */
    text: string;

    /**
     * Определяет, является ли абзац последним в текущем сообщении
     */
    last?: boolean;
}
