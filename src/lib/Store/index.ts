import { isEqual } from '../../utils/isEqual';

export class Store<T extends object | Array<any>> {
    private _onChangeHandlers: ((oldData: T, newData: T) => void)[] = [];

    constructor(private _data: T) {
    }

    public getData(): T {
        return this._data;
    }

    public setData(data: T) {
        const oldData = this._data;

        this._data = data;

        this._onChangeHandlers.forEach(cb => {
            if (!isEqual(oldData, data)) {
                cb(oldData, data);
            }
        });
    }

    addChangeListener(cb: (oldData: T, newData: T) => void) {
        this._onChangeHandlers.push(cb);
    }

    removeChangeListener(cb: (oldData: T, newData: T) => void) {
        this._onChangeHandlers = this._onChangeHandlers.filter(handler => handler !== cb);
    }
}
