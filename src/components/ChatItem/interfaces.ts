import { Component } from '../../lib/Component';

export interface IChatItem {
    /**
     * Альтернативный текст для аватарки
     */
    avatarAlt: string;

    /**
     * Путь к аватарке
     */
    avatarSrc: string;

    /**
     * Текст сообщения в чате
     */
    chatMessage: string | Component;

    /**
     * Название чата
     */
    chatName: string;

    /**
     * Путь к странице чата
     */
    chatUrl: string;

    /**
     * Дата/время сообщения в чате
     */
    date: string;

    /**
     * Компонент с количеством новых сообщений в чате
     */
    newMessage?: Component;
}