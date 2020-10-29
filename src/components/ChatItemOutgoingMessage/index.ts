import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatItemOutgoingMessage } from './interfaces';

export class CharItemOutgoingMessage extends Component<IChatItemOutgoingMessage> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}