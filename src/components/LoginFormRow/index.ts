import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface ILoginFormRow {
    label: string;
    name: string;
    type: 'email' | 'password' | 'tel' | 'text';
    value: string;
}

export class LoginFormRow extends Component<ILoginFormRow> {
    constructor(props: ILoginFormRow) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}