import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatItem } from './interfaces';

export class ChatItem extends Component<IChatItem> {
    render() {
        const {
            open,
            ...props
        } = this.props;

        return templator.compile(template, {
            className: `chat-item${open ? ' chat-item_active' : ''}`,
            ...props,
        });
    }
}
