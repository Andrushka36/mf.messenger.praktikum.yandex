export interface IRouteProps {
    /**
     * Запрещает переход на роут для авторизированного пользователя
     * @default false
     */
    onlyPublic?: boolean;

    /**
     * Запрещает переход на роут для неавторизированного пользователя
     * @default false
     */
    private?: boolean;
}
