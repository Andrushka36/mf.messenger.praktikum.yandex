import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IError } from './interfaces';

export class Err extends Component<IError> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}