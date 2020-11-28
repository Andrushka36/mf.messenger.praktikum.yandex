import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { Form } from '../../lib/Form';
import { ILoginForm } from './interfaces';
import './styles.sass';

export class LoginForm<T> extends Component<ILoginForm<T>> {
    form: Form<T> | null = null;

    render() {
        const {
            buttonLabel,
            content,
            error,
            linkHref,
            linkLabel,
            long,
            pageTitle,
        } = this.props;

        return templator.compile(template, {
            buttonLabel,
            className: long ? 'login-form_long' : '',
            content,
            error,
            linkHref,
            linkLabel,
            long,
            pageTitle,
        });
    }

    createForm() {
        if (this.element instanceof HTMLElement) {
            if (this.form === null || !this.form?.isIntoDOM()) {
                const {
                    excludeOnSubmit: exclude,
                    onSubmit,
                    validator,
                } = this.props;

                this.form = new Form<T>({
                    exclude,
                    onSubmit,
                    validator,
                    wrapper: this.element,
                });
            }
        }
    }

    componentDidMount() {
        this.createForm();
    }

    componentDidUpdate() {
        this.createForm();
    }
}
