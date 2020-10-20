import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { ChatActionsItem } from '../ChatActionsItem';

interface IChatActions {
    buttons: ChatActionsItem[];
}

export class ChatActions extends Component<IChatActions> {
    constructor(props: IChatActions) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}