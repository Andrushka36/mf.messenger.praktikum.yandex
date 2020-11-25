import { Component } from '../../lib/Component';

export interface IChatActionsItem {
    /**
     * Иконка, выводимая внутри кнопки
     */
    icon: Component;

    /**
     * Подпись кнопки
     */
    label: string;

    /**
     * Обработчик события "клик" по кнопке
     */
    onClick: Function;
}
