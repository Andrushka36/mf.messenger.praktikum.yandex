import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatActionsButton } from './interfaces';

export class ChatActionsButton extends Component<IChatActionsButton> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}