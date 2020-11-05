import { Component } from '../Component';
import { router } from '../Router';

export class ErrorHandler {
    static __instance: ErrorHandler;

    public codes: number[] = [];

    public defaultCode: number | null = null;

    constructor() {
        if (ErrorHandler.__instance) {
            return ErrorHandler.__instance;
        }

        ErrorHandler.__instance = this;
    }

    public getPathname(code: number) {
        return `/${code}`;
    }

    public addRoute(code: number, block: Component) {
        router.use(this.getPathname(code), block, `Ошибка ${code}`);
    }

    public use(code: number, block: Component) {
        this.addRoute(code, block);

        this.codes.push(code);

        return this;
    }

    public useFallback(code: number, block: Component) {
        this.addRoute(code, block);

        this.defaultCode = code;

        return this;
    }

    public handle(code: number) {
        if (this.codes.includes(code)) {
            router.go(this.getPathname(code));
        } else if (this.defaultCode) {
            router.go(this.getPathname(this.defaultCode));
        }
    }
}

export const errorHandler = new ErrorHandler();