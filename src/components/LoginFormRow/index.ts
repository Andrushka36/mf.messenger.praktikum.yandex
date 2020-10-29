import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { ILoginFormRow } from './interfaces';

export class LoginFormRow extends Component<ILoginFormRow> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}