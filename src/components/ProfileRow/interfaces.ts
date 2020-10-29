export interface IProfileRowReadonly {
    /**
     * Подпись элемента
     */
    title: string;

    /**
     * Значение элемента
     */
    value: string;

    /**
     * Определяет, является ли элемент инпутом
     */
    writable?: false;
}

export interface IProfileRowWritable {
    /**
     * Имя элемента
     */
    name: string;

    /**
     * Подпись элемента
     */
    title: string;

    /**
     * Тип элемента
     */
    type: 'email' | 'file' | 'password' | 'tel' | 'text';

    /**
     * Значение элемента
     */
    value: string;

    /**
     * Определяет, является ли элемент инпутом
     */
    writable: true;
}