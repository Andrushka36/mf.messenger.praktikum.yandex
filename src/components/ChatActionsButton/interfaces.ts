import { Component } from '../../lib/Component';

export interface IChatActionsButton {
    /**
     * Класс кнопки
     */
    className: string;

    /**
     * Иконка, выводимая внутри кнопки
     */
    icon: Component;

    /**
     * Обработчик события "клик" по кнопке
     */
    onClick: Function;

    /**
     * Атрибут title кнопки
     */
    title: string;
}
