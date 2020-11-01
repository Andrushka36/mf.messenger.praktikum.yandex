import { Route } from './Route';
import { Component } from '../Component';

export class Router {
    static __instance: Router;

    public routes: Route[] = [];

    public history: History = window.history;

    private _currentRoute: Route | null = null;

    constructor(
        private _selector: string,
    ) {
        if (Router.__instance) {
            return Router.__instance;
        }

        Router.__instance = this;
    }

    use(pathname: string, block: Component, title: string) {
        const route = new Route(pathname, block, title, this._selector);

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: any) => {
            this._onRoute(event.currentTarget.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route || null;

        if (this._currentRoute !== null) {
            this._currentRoute.render();
        }
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);

        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}