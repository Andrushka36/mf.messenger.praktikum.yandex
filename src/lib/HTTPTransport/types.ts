export enum HTTPMethods {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

export type HTTPTransportOptionsType = {
    /**
     * Тело запроса
     */
    body?: Record<string, unknown> | FormData;

    /**
     * Заголовки запроса
     */
    headers?: Record<string, string>;

    /**
     * Тайм-аут запроса
     */
    timeout?: number;
}

export type HTTPRequestOptionsType = {
    /**
     *  Метод запроса
     */
    method: HTTPMethods;
} & HTTPTransportOptionsType;
