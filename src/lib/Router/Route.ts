import { render } from '../../utils/render';
import { Component } from '../Component';

export class Route {
    constructor(
        private _pathname: string,
        private _block: Component,
        private _title: string,
        private _selector: string,
    ) {
    }

    leave() {
        if (this._block !== null && this._block.element instanceof HTMLElement) {
            this._block.element.remove();
        }
    }

    match(pathname: string) {
        const regexp = new RegExp(`^${this._pathname}\/?$`);
        return regexp.test(pathname);
    }

    render() {
        document.title = this._title;
        render(this._selector, this._block as Component);
    }
}