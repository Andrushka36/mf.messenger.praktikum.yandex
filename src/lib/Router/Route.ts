import { render } from '../../utils/render';
import { Component } from '../Component';
import { IRouteProps } from './types';

export class Route {
    private _private: boolean;

    private _onlyPublic: boolean;

    private _regExp: RegExp;

    constructor(
        private _pathname: string,
        private _block: Component,
        private _title: string,
        private _selector: string,
        props: IRouteProps = {},
    ) {
        const {
            onlyPublic = false,
            private: _private = false,
        } = props;

        this._private = _private;
        this._onlyPublic = onlyPublic;
        const pattern = _pathname.indexOf(':') === -1 ? this._pathname : this._pathname.replace(/(:\w+)(\/?)$/, '(\\w+)$2');
        this._regExp = new RegExp(`^${pattern}\/?$`, 'i');
    }

    leave() {
        if (this._block !== null) {
            this._block.unmount();
        }
    }

    match(pathname: string) {
        return this._regExp.test(pathname);
    }

    render() {
        if (this._title !== '') {
            document.title = this._title;
        }
        render(this._selector, this._block);
    }

    isPrivate() {
        return this._private;
    }

    isOnlyPublic() {
        return this._onlyPublic;
    }

    getRegExpPattern() {
        return this._regExp;
    }
}
