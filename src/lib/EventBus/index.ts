export class EventBus {
    private readonly _listeners: { [key: string]: Function[] };

    constructor() {
        this._listeners = {};
    }

    public getListeners() {
        return this._listeners;
    }

    public on(event: string, callback: Function) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }

        this._listeners[event].push(callback);
    }

    public off(event: string, callback: Function) {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event] = this._listeners[event].filter(
            listener => listener !== callback
        );
    }

    public emit(event: string, ...args: any[]) {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}