import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatActions } from './interfaces';

export class ChatActions extends Component<IChatActions> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}
