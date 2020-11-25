export class WebSocketService {
    static domain: string = '';

    private _ws: WebSocket;

    constructor(path: string) {
        this._ws = new WebSocket(`${WebSocketService.domain}${path}`);
    }

    public send(type: string,  { message }: { message: string }) {
        this._ws.send(JSON.stringify({
            content: message,
            type,
        }));
    }

    public onopen(cb: (e: Event) => void) {
        this._ws.addEventListener('open', cb);
    }

    public onclose(cb: (e: CloseEvent) => void) {
        this._ws.addEventListener('close', cb);
    }

    public onmessage(cb: (data: any) => void) {
        this._ws.addEventListener('message', (e: MessageEvent) => {
            try {
                cb(JSON.parse(e.data));
            } catch (e) {

            }
        });
    }

    static setDomain(domain: string) {
        WebSocketService.domain = domain;
    }
}

WebSocketService.setDomain(`wss://${process.env.HOST}`);
