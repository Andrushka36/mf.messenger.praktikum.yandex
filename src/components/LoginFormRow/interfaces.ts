export interface ILoginFormRow {
    /**
     * Подпись элемента формы
     */
    label: string;

    /**
     * Имя элемента формы
     */
    name: string;

    /**
     * Тип элемента формы
     */
    type: 'email' | 'password' | 'tel' | 'text';

    /**
     * Значение текстового поля
     */
    value: string;
}