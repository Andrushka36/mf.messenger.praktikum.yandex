import { Component } from '../../lib/Component';

export interface IModal {
    /**
     * Текст кнопки подтверждения
     */
    confirmText: string;

    /**
     * Обработчик, вызываемый при клике на кнопку подтверждения
     */
    onConfirm: Function;

    /**
     * Заголовок модального окна
     */
    title: string;

    /**
     * Содержимое формы модального окна
     */
    content?: Component;
}
