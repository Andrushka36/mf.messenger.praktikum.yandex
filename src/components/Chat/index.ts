import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { ChatHeader } from '../ChatHeader';
import { Messages } from '../Messages';
import { MessageForm } from '../MessageForm';
import { ChatDeleteModal } from '../ChatDeleteModal';

interface IChat {
    chatHeader: ChatHeader;
    deleteModal: ChatDeleteModal;
    messages: Messages;
    messageForm: MessageForm;
}

export class Chat extends Component<IChat> {
    constructor(props: IChat) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}