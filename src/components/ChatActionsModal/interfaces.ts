import { Component } from '../../lib/Component';

export interface IChatActionsModal {
    /**
     * Компонент, выводимый внутри модального окна
     */
    content: Component;

    /**
     * Положение модального окна по оси X относительно кнопки, отвечающей за его отображение
     */
    x: 'left' | 'right';

    /**
     * Положение модального окна по оси Y относительно кнопки, отвечающей за его отображение
     */
    y: 'top' | 'bottom';
}