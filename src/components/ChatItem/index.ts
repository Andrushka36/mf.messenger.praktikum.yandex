import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

export interface IChatItem {
    avatarAlt: string;
    avatarSrc: string;
    chatMessage: string | Component;
    chatName: string;
    chatUrl: string;
    date: string;
    newMessage?: Component;
}

export class ChatItem extends Component<IChatItem> {
    constructor(props: IChatItem) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}