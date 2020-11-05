import { httpTransport } from '../HTTPTransport';

export class DTOModel<T extends Record<string, unknown>> {
    constructor(
        private _name: string,
    ) {
    }

    find = (body?: T) => {
        return httpTransport.get(this._name, { body });
    }

    update = (body: T) => {
        return httpTransport.put(this._name, { body });
    }

    delete = (body?: T) => {
        return httpTransport.delete(this._name, { body });
    }

    create = (body?: T) => {
        return httpTransport.post(this._name, { body });
    }

    get = (id: number) => {
        return new DTOModel(`${this._name}/${id}`);
    }
}