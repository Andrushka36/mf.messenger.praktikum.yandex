import { Component } from '../../lib/Component';

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
    status?: 'read' | 'sent';

    /**
     * Время сообщения
     */
    time: string;

    /**
     * Тип сообщения
     */
    type: 'incoming' | 'outgoing';
}