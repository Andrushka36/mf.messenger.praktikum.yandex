import { Component } from '../../lib/Component';
import { MessageStatus, MessageType } from '../../models/chats';

export interface IMessage {
    /**
     * Определяет, является ли сообщение изображением
     */
    attach?: boolean;

    /**
     * Абзац(ы) сообщения
     */
    content: Component | Component[];

    /**
     * Статус исходящего сообщения
     */
    status?: MessageStatus;

    /**
     * Время сообщения
     */
    time: string;

    /**
     * Тип сообщения
     */
    type: MessageType;

    /**
     * Отображаемое имя пользователя
     */
    user: string;

    /**
     * Идентификатор пользователя
     */
    userId: number;
}
