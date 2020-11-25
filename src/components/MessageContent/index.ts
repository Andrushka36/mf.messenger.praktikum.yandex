import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IMessageContent } from './interfaces';

export class MessageContent extends Component<IMessageContent> {
    render() {
        const { text, last } = this.props;
        return templator.compile(template, {
            text,
            timeHolderClassName: last ? 'message__time-holder' : '',
        });
    }
}
