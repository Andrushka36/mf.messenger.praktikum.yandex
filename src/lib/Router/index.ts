import { Route } from './Route';
import { Component } from '../Component';
import { Authorization } from '../Authorization';
import { IRouteProps } from './types';

export class Router {
    static __instance: Router;

    public routes: Route[] = [];

    public history: History = window.history;

    private _currentRoute: Route | null = null;

    public fallback: Route | null = null;

    private _authorization: Authorization | null = null;

    public loader: Route | null = null;

    public guestPage: Route | null = null;

    constructor(
        private _selector: string,
    ) {
        if (Router.__instance) {
            return Router.__instance;
        }

        Router.__instance = this;

        document.body.addEventListener('click', (event: Event) => {
            const path = event.composedPath() as unknown as NodeListOf<HTMLElement>;
            const link = Array.from(path).find(({ tagName }) => tagName === 'A');
            if (link !== undefined) {
                const url = link.getAttribute('href');
                if (url !== null) {
                    this.go(url);
                }
                event.preventDefault();
            }
        });
    }

    use(pathname: string, block: Component, title: string, props?: IRouteProps) {
        const route = new Route(pathname, block, title, this._selector, props);

        this.routes.push(route);

        return this;
    }

    private _start() {
        window.onpopstate = ((event: any) => {
            this._onRoute(event.currentTarget.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    start() {
        if (this._authorization) {
            this.loader?.render();

            this._authorization
                .check()
                .finally(() => {
                    this.loader?.leave();
                    this._start();
                });
        } else {
            this._start();
        }
    }

    _onRoute(pathname: string) {
        const guestPage = this._authorization && !this._authorization.isAuthorized() && this.guestPage;
        const route = this.getRoute(pathname) || guestPage || this.fallback;

        this.renderRoute(route);
    }

    renderComponent(component: Component) {
        const route = new Route('', component, '', this._selector);

        this.renderRoute(route);
    }

    renderRoute(route: Route | null) {
        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;

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
        return this.routes.find(route => {
            const isPrivateAllowed = this._authorization?.isAuthorized() && route.isPrivate();
            const isPublicAllowed = !this._authorization?.isAuthorized() && (route.isOnlyPublic() || !route.isPrivate()) || this._authorization?.isAuthorized() && !route.isOnlyPublic() && !route.isPrivate();
            return route.match(pathname) && (!this._authorization || isPrivateAllowed || isPublicAllowed);
        });
    }

    useFallback(pathname: string, block: Component, title: string) {
        this.fallback = new Route(pathname, block, title, this._selector);

        return this;
    }

    useAuthorization(authorization: Authorization) {
        this._authorization = authorization;

        return this;
    }

    useLoader(block: Component) {
        this.loader = new Route('', block, 'Загрузка', this._selector);

        return this;
    }

    useGuestPage(pathname: string, block: Component, title: string) {
        this.guestPage = new Route(pathname, block, title, this._selector, { onlyPublic: true });

        this.routes.push(this.guestPage);

        return this;
    }

    getCurrentParam(): string | undefined {
        const match = window.location.pathname.match(this._currentRoute?.getRegExpPattern() || '');
        return match && typeof match[1] === 'string' ? match[1] : undefined;
    }
}

export const router = new Router('#root');
