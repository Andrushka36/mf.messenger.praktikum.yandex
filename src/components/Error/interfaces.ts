export interface IError {
    /**
     * Код ошибки
     */
    code: number;

    /**
     * Текст ошибки
     * @default Мы уже фиксим
     */
    text?: string;
}