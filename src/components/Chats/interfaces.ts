import { Component } from '../../lib/Component';

export interface IChats {
    /**
     * Список чатов
     */
    chatItems: Component[];

    /**
     * Содержимое компонента
     */
    content: Component;

    /**
     * Обработчик события "инпут" поискового поля
     */
    onChange: Function;

    /**
     * Заголовок страницы
     */
    pageTitle: string;
}