export interface IChatAddUsersItem {
    /**
     * Отображаемое имя пользователя
     */
    displayName: string | null;

    /**
     * Имя пользователя
     */
    firstName: string;

    /**
     * Идентификатор пользователя
     */
    id: number;

    /**
     * Логин пользователя
     */
    login: string;

    /**
     * Фамилия пользователя
     */
    secondName: string;
}
