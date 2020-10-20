import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IChatItemOutgoingMessage {
    message: string;
}

export class CharItemOutgoingMessage extends Component<IChatItemOutgoingMessage> {
    constructor(props: IChatItemOutgoingMessage) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}