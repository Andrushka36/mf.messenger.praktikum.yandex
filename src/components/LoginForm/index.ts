import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { Form } from '../../lib/Form';
import { ILoginForm } from './interfaces';
import './styles.sass';

export class LoginForm<T> extends Component<ILoginForm<T>> {
    constructor(props: ILoginForm<T>) {
        super(props);

        if (this.element instanceof HTMLElement) {
            const {
                excludeOnSubmit: exclude,
                onSubmit,
                validator,
            } = this.props;

            new Form<T>({
                exclude,
                onSubmit,
                validator,
                wrapper: this.element,
            });
        }
    }

    render() {
        const {
            buttonLabel,
            content,
            linkHref,
            linkLabel,
            long,
            pageTitle,
        } = this.props;

        return templator.compile(template, {
            buttonLabel,
            className: long ? 'login-form_long' : '',
            content,
            linkHref,
            linkLabel,
            long,
            pageTitle,
        });
    }
}
