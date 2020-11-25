import { httpTransport } from '../HTTPTransport';

export class DTOModel<T extends Record<string, unknown>> {
    constructor(
        private _name: string,
    ) {
    }

    find = (body?: T | FormData) => {
        return httpTransport.get(this._name, { body });
    }

    update = (body: T | FormData) => {
        return httpTransport.put(this._name, { body });
    }

    delete = (body?: T | FormData) => {
        return httpTransport.delete(this._name, { body });
    }

    create = (body?: T | FormData) => {
        return httpTransport.post(this._name, { body });
    }

    get<T extends Record<string, unknown>>(id: number | string) {
        return new DTOModel<T>(`${this._name}/${id}`);
    }
}
