import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IChatActionsItem {
    icon: Component;
    label: string;
    onClick: Function;
}

export class ChatActionsItem extends Component<IChatActionsItem> {
    constructor(props: IChatActionsItem) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}