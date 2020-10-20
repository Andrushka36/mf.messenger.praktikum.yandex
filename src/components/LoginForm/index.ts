import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { Form, ValidationFunctionType } from '../../lib/Form';

interface ILoginForm<T> {
    buttonLabel: string;
    content: Component[];
    excludeOnSubmit?: keyof T | (keyof T)[];
    linkHref: string;
    linkLabel: string;
    long?: true;
    onSubmit: (values: T) => void;
    pageTitle: string;
    validator?: Partial<{ [key in keyof T]: ValidationFunctionType<T> }>;
}

export class LoginForm<T> extends Component<ILoginForm<T>> {
    public form!: Form<T>;

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
            excludeOnSubmit,
            long,
            onSubmit,
            validator,
            ...others
        } = this.props;

        return templator.compile(template, {
            ...others,
            className: long ? 'login-form_long' : '',
        });
    }
}