import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IError } from './interfaces';

export class Err extends Component<IError> {
    render() {
        const {
            code,
            text = 'Мы уже фиксим',
        } = this.props;
        return templator.compile(template, {
            code,
            text,
        });
    }
}