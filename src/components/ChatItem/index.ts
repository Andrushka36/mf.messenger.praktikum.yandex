import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatItem } from './interfaces';


export class ChatItem extends Component<IChatItem> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}