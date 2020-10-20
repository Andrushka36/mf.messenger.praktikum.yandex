import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IChatActionsButton {
    className: string;
    icon: Component;
    onClick: Function;
    title: string;
}

export class ChatActionsButton extends Component<IChatActionsButton> {
    constructor(props: IChatActionsButton) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}