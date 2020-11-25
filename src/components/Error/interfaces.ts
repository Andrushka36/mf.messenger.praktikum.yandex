export interface IError {
    /**
     * Код ошибки
     */
    code: number;

    /**
     * Ссылка кнопки "Назад"
     */
    linkHref?: string;

    /**
     * Текст кнопки "Назад"
     */
    linkLabel?: string;

    /**
     * Текст ошибки
     * @default Мы уже фиксим
     */
    text?: string;
}
