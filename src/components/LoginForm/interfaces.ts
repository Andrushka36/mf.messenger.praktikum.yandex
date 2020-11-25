import { Component } from '../../lib/Component';
import { ValidationFunctionType } from '../../lib/Form/types';

export interface ILoginForm<T> {
    /**
     * Подпись кнопки
     */
    buttonLabel: string;

    /**
     * Элементы формы
     */
    content: Component[];

    /**
     * Свойство/перечень свойств, не передаваемых в функцию-обработчик события "сабмит" формы
     */
    excludeOnSubmit?: keyof T | (keyof T)[];

    /**
     * Атрибут href ссылки, расположенной внизу формы
     */
    linkHref: string;

    /**
     * Подпись ссылки, расположенной внизу формы
     */
    linkLabel: string;

    /**
     * Определяет увеличенную высоту блока формы
     */
    long?: boolean;

    /**
     * Обработчик события "сабмит" формы
     * @param values - значения элементов формы
     */
    onSubmit: (values: T) => void;

    /**
     * Заголовок формы
     */
    pageTitle: string;

    /**
     * Валидатор формы
     */
    validator?: Partial<{ [key in keyof T]: ValidationFunctionType<T> }>;
}
