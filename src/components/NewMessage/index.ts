import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { INewMessage } from './interfaces';

export class NewMessage extends Component<INewMessage> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}