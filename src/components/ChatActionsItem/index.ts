import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatActionsItem } from './interfaces';

export class ChatActionsItem extends Component<IChatActionsItem> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}
