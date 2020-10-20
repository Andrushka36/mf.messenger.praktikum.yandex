import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { ChatRenameForm } from '../ChatRenameForm';
import { ChatInformation } from '../ChatInformation';

interface IChatHeader {
    chatRenameForm: ChatRenameForm;
    chatInformation: ChatInformation;
}

export class ChatHeader extends Component<IChatHeader> {
    constructor(props: IChatHeader) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}