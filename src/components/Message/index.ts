import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IMessage } from './interfaces';
import { SentIcon } from '../../assets/SentIcon';
import { ReadIcon } from '../../assets/ReadIcon';
import { MessageStatus, MessageType } from '../../models/chats';
import { userStore } from '../../stores';

export class Message extends Component<IMessage> {
    sentIcon!: Component;

    readIcon!: Component;

    public getAttachClassName(attach?: boolean) {
        return attach ? 'message_attach' : '';
    }

    public getStatusClassName(type: MessageType, status?: MessageStatus) {
        return type === MessageType.OUTGOING ? `message_${status}` : '';
    }

    public getTypeClassName(type: MessageType) {
        return `message_${type}`;
    }

    public getTimeIcon(type: MessageType, status?: MessageStatus) {
        return type === MessageType.OUTGOING ? (
            status === MessageStatus.READ ? this.readIcon : (
                status === MessageStatus.SENT ? this.sentIcon : ''
            )
        ) : '';
    }

    public async prerender() {
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
            user,
            userId,
        } = this.props;

        const { id } = userStore.getData();

        return templator.compile(template, {
            className: `${this.getAttachClassName(attach)} ${this.getStatusClassName(type, status)} ${this.getTypeClassName(type)}`,
            content,
            linkHref: `/profile${id !== userId ? `/${userId}` : ''}`,
            time,
            timeIcon: this.getTimeIcon(type, status),
            user,
        });
    }
}
