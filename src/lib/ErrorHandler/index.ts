export class ErrorHandler {
    static __instance: ErrorHandler;

    public callbacks: Record<number, Function> = {};

    public fallback: Function = () => void 0;

    constructor() {
        if (ErrorHandler.__instance) {
            return ErrorHandler.__instance;
        }

        ErrorHandler.__instance = this;
    }

    use(code: number, callback: Function) {
        this.callbacks[code] = callback;

        return this;
    }

    public useFallback(callback: Function) {
        this.fallback = callback;

        return this;
    }

    public handle(code: number) {
        if (code in this.callbacks) {
            this.callbacks[code]();
        } else {
            this.fallback();
        }
    }
}

export const errorHandler = new ErrorHandler();
