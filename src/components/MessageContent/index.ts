import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IMessageContent {
    text: string;
    last?: boolean;
}

export class MessageContent extends Component<IMessageContent> {
    constructor(props: IMessageContent) {
        super(props);
    }

    render() {
        const { text, last } = this.props;
        return templator.compile(template, {
            text,
            timeHolderClassName: last ? 'message__time-holder' : '',
        });
    }
}