import { queryStringify } from '../../utils/queryStringify';
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
        const newUrl = url + queryStringify(body);
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
            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            if (method === HTTPMethods.GET || !body) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(body));
            }
        })
    };
}

export const httpTransport = new HTTPTransport();
