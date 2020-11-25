export interface IChatAddUsersItem {
    /**
     * Отображаемое имя пользователя
     */
    display_name: string | null;

    /**
     * Имя пользователя
     */
    first_name: string;

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
    second_name: string;
}
