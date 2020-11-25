import { queryStringify } from '../../utils/queryStringify';
import { getApiPath } from '../../utils/getApiPath';
import { HTTPMethods, HTTPRequestOptionsType, HTTPTransportOptionsType } from './types';

export class HTTPTransport {
    private _domain: string = '';

    setDomain = (domain: string) => {
        this._domain = domain;
    };

    getDomain = () => {
        return this._domain;
    }

    get = (url: string, options: HTTPTransportOptionsType = {}) => {
        const { body } = options;
        const newUrl = url + queryStringify(!(body instanceof FormData) ? body : undefined);
        return this.request(newUrl, { ...options, method: HTTPMethods.GET }, options.timeout);
    };

    put = (url: string, options: HTTPTransportOptionsType = {}) => {
        return this.request(url, { ...options, method: HTTPMethods.PUT }, options.timeout);
    };

    post = (url: string, options: HTTPTransportOptionsType = {}) => {
        return this.request(url, { ...options, method: HTTPMethods.POST }, options.timeout);
    };

    delete = (url: string, options: HTTPTransportOptionsType = {}) => {
        return this.request(url, { ...options, method: HTTPMethods.DELETE }, options.timeout);
    };

    request = (url: string, options: HTTPRequestOptionsType, timeout = 5000) => {
        const { method, body, headers = {} } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.withCredentials = true;

            xhr.open(method, this.getDomain() + url);

            xhr.onload = function() {
                const {
                    response,
                    status,
                } = xhr;

                if (status === 200) {
                    resolve(response);
                } else {
                    reject({
                        response,
                        status,
                    });
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.timeout = timeout;
            if (!(body instanceof FormData)) {
                xhr.setRequestHeader('content-type', 'application/json');
            }
            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            if (method === HTTPMethods.GET || !body) {
                xhr.send();
            } else {
                xhr.send(body instanceof FormData ? body : JSON.stringify(body));
            }
        });
    };
}

export const httpTransport = new HTTPTransport();

httpTransport.setDomain(getApiPath({
    host: process.env.HOST,
    path: process.env.PATH,
}));
