import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IMessageDate } from './interfaces';

export class MessageDate extends Component<IMessageDate> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}