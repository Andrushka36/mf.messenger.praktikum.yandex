import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatHeader } from './interfaces';

export class ChatHeader extends Component<IChatHeader> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}