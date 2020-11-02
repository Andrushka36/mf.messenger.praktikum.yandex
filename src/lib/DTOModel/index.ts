// на рабочих проектах у меня много различных запросов,
// и мы используем примерно такие dto'шки
// мне они очень нравятся, поэтому решил затащить их в этот проект
// хотя в принципе тут, наверное, они особо и не нужны
// потому что здесь обычно к "ручкам" только по одному протоколу запросы идут
// но интересно твое мнение в целом о таких классах,
// мб еще какие-то способы есть интересные?

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