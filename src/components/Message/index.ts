import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IMessage } from './interfaces';
import { SentIcon } from '../../assets/SentIcon';
import { ReadIcon } from '../../assets/ReadIcon';

export class Message extends Component<IMessage> {
    sentIcon!: Component;

    readIcon!: Component;

    public getAttachClassName(attach?: boolean) {
        return attach ? 'message_attach' : '';
    }

    public getStatusClassName(type: 'incoming' | 'outgoing', status?: 'read' | 'sent') {
        return type === 'outgoing' ? (
            status === 'read' ? 'message_read' : (
                status === 'sent' ? 'message_sent' : ''
            )
        ) : '';
    }

    public getTypeClassName(type: 'incoming' | 'outgoing') {
        return type === 'incoming' ? 'message_incoming' : (
            type === 'outgoing' ? 'message_outgoing' : ''
        );
    }

    public getTimeIcon(type: 'incoming' | 'outgoing', status?: 'read' | 'sent') {
        return type === 'outgoing' ? (
            status === 'read' ? this.readIcon : (
                status === 'sent' ? this.sentIcon : ''
            )
        ) : '';
    }

    public prerender() {
        this.sentIcon = new SentIcon();
        this.readIcon = new ReadIcon();
    }

    public render() {
        const {
            attach,
            content,
            status,
            time,
            type,
        } = this.props;

        return templator.compile(template, {
            className: `${this.getAttachClassName(attach)} ${this.getStatusClassName(type, status)} ${this.getTypeClassName(type)}`,
            content,
            time,
            timeIcon: this.getTimeIcon(type, status),
        });
    }
}

