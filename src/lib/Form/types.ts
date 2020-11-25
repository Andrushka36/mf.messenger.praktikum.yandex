export type ValidationFunctionType<T> = (data: T) => string | undefined;

export type FormType<T> = {
    /**
     * Обработчик события "сабмит" формы
     * @param values - поля формы
     */
    onSubmit: (values: T) => void;

    /**
     * Обертка формы
     */
    wrapper: HTMLElement;

    /**
     * Валидатор формы
     */
    validator?: Partial<{ [key in keyof T]: ValidationFunctionType<T> }>;

    /**
     * Поля, исключаемые из формы при сабмите
     */
    exclude?: keyof T | (keyof T)[];
}
