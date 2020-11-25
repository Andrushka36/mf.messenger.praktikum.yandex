import { Component } from '../../lib/Component';

export interface IChatModalContent {
    /**
     * Атрибут name инпута
     */
    inputName?: string;

    /**
     * Обработчик, вызываемый при изменении значения инпута
     */
    onChange?: Function;

    /**
     * Плейсхолдер инпута
     */
    placeholder?: string;

    /**
     * Значение инпута
     */
    value?: string;

    /**
     * Список пользователей
     */
    users?: Component[];
}
