import { Component } from '../../lib/Component';

export interface IProfile {
    /**
     * Путь к аватарке
     */
    avatarSrc: string;

    /**
     * Содержимое страницы
     */
    content: Component | Component[];

    /**
     * Отображаемое имя пользователя
     */
    displayName: string;

    /**
     * Определяет увеличенную высоту блока содержимого страницы
     */
    long?: boolean;

    /**
     * Заголовок страницы
     */
    pageTitle: string;
}