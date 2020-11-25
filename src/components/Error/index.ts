import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IError } from './interfaces';
import { authorization } from '../../lib/Authorization';
import './styles.sass';

export class Err extends Component<IError> {
    public isAuthorized!: boolean;

    prerender() {
        this.isAuthorized = true;
    }

    render() {
        const {
            code,
            linkHref: linkHrefProp,
            linkLabel: linkLabelProp,
            text = 'Мы уже фиксим',
        } = this.props;

        const {
            linkHref,
            linkLabel,
        } = this.isAuthorized ? ({
            linkHref: '/',
            linkLabel: 'Назад к чатам',
        }) : ({
            linkHref: '/login',
            linkLabel: 'Назад к авторизации',
        });

        return templator.compile(template, {
            code,
            linkHref: linkHrefProp || linkHref,
            linkLabel: linkLabelProp || linkLabel,
            text,
        });
    }

    checkAuthorization() {
        if (this.isAuthorized !== authorization.isAuthorized()) {
            this.isAuthorized = authorization.isAuthorized();
            this.forceUpdate();
        }
    }

    componentDidMount() {
        this.checkAuthorization();
    }

    componentDidUpdate() {
        this.checkAuthorization();
    }
}
