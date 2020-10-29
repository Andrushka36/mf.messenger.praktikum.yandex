export interface IChatRenameForm {
    /**
     * Обработчик события "сабмит" формы
     */
    onSubmit: Function;

    /**
     * Значение текстового поля формы
     */
    title: string;
}