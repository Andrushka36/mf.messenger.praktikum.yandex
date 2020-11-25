import { EventBus } from '../EventBus';
import { isEqual } from '../../utils/isEqual';

export class Component<T extends {} = any> {
    constructor(props: T = {} as T) {
        const eventBus = new EventBus();

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Component.EVENTS.INIT);
    }

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_SCU: 'flow:should-component-update',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_CWU: 'flow:component-will-unmount',
    };

    private _element: SVGElement | DocumentFragment | HTMLElement | Text | null = null;

    private _mounted: boolean = false;

    public readonly props: T;

    private eventBus: () => EventBus;

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Component.EVENTS.FLOW_SCU, this._shouldComponentDidUpdate.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    }

    private init() {
        this._prerender();

        this._render();
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    public componentDidMount() {}

    _shouldComponentDidUpdate(oldProps: T, newProps: T) {
        const response = this.shouldComponentUpdate(oldProps, newProps);

        if (response) {
            this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    shouldComponentUpdate(oldProps: T, newProps: T): boolean {
        return !isEqual(oldProps, newProps);
    }

    private _componentDidUpdate() {
        this.componentDidUpdate();
    }

    public componentDidUpdate() {
    }

    public setProps = (nextProps: Partial<T>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    private _render() {
        const result = this.render();

        if (!this._mounted || this._element === null || result === null) {
            this._element = result;
        } else {
            if (this._element instanceof HTMLElement) {
                this._element.replaceWith(result);
                this._element = result;
            }
        }

        if (this._mounted) {
            this.eventBus().emit(Component.EVENTS.FLOW_CDU);
        }
    }

    public render(): SVGElement | DocumentFragment| HTMLElement | Text | null {
        return null;
    }

    public get element() {
        return this._element;
    }

    public getContent = (): SVGElement | DocumentFragment| HTMLElement | Text | null => {
        // эмитим событие CDM после того как будет вызван метод getContent,
        // который вызывается внутри функции render
        // эмитим в микротаске, чтоб оно заэмитилось только после возврата элемента
        queueMicrotask(() => {
            this._mounted = true;
            this.eventBus().emit(Component.EVENTS.FLOW_CDM);
        });
        return this.element;
    }

    private _makePropsProxy(props: T) {
        return new Proxy<T>(props, {
            set: (target: T, prop: string, value: string | number | boolean | Function) => {
                const oldProps = { ...this.props };

                (target as unknown as { [key: string]: string | number | boolean | Function })[prop] = value;

                this.eventBus().emit(Component.EVENTS.FLOW_SCU, oldProps, target);

                return true;
            },
        });
    }

    public show(propertyValue: string = 'block') {
        if (this._element instanceof HTMLElement && this._element.style.display === 'none') {
            this._element.style.display = propertyValue;
            this.eventBus().emit(Component.EVENTS.FLOW_CDU);
        }
    }

    public hide() {
        if (this._element instanceof HTMLElement && this._element.style.display !== 'none') {
            this._element.style.display = 'none';
            this.eventBus().emit(Component.EVENTS.FLOW_CDU);
        }
    }

    public visibilityToggle(propertyValue: string = 'block') {
        if (this._element instanceof HTMLElement) {
            if (this._element.style.display === 'none') {
                this.show(propertyValue);
            } else {
                this.hide();
            }
        }
    }

    public forceUpdate() {
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }

    private _prerender() {
        this.prerender();
    }

    public prerender() {

    }

    public componentWillUnmount() {

    }

    private _componentWillUnmount() {
        this.componentWillUnmount();
    }

    public unmount() {
        if (this._element instanceof HTMLElement) {
            this.eventBus().emit(Component.EVENTS.FLOW_CWU);
            this._element.remove();
        }
    }
}
