import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { SentIcon } from '../../assets/SentIcon';
import { ReadIcon } from '../../assets/ReadIcon';

interface IMessage {
    attach?: boolean;
    content: Component | Component[];
    status?: 'read' | 'sent';
    time: string;
    type: 'incoming' | 'outgoing';
}

export class Message extends Component<IMessage> {
    sentIcon!: Component;

    readIcon!: Component;

    constructor(props: IMessage) {
        super(props);
    }

    prerender() {
        this.sentIcon = new SentIcon({});
        this.readIcon = new ReadIcon({});
    }

    render() {
        const {
            attach,
            content,
            status,
            time,
            type,
        } = this.props;

        const attachClassName = attach ? 'message_attach' : '';
        const statusClassName = type === 'outgoing' ? (
            status === 'read' ? 'message_read' : (
                status === 'sent' ? 'message_sent' : ''
            )
        ) : '';
        const typeClassName = type === 'incoming' ? 'message_incoming' : (
            type === 'outgoing' ? 'message_outgoing' : ''
        );

        return templator.compile(template, {
            className: `${attachClassName} ${statusClassName} ${typeClassName}`,
            content,
            time,
            timeIcon: type === 'outgoing' ? (
                status === 'read' ? this.readIcon : (
                    status === 'sent' ? this.sentIcon : ''
                )
            ) : '',
        });
    }
}

