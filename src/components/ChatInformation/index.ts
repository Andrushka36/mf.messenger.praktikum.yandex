import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { ChatActionsButton } from '../ChatActionsButton';
import { ChatActionsModal } from '../ChatActionsModal';

interface IChatInformation {
    avatarAlt: string;
    avatarSrc: string;
    chatActionsButton: ChatActionsButton;
    chatActionsModal: ChatActionsModal;
    chatName: string;
    status: string;
}

export class ChatInformation extends Component<IChatInformation> {
    constructor(props: IChatInformation) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}