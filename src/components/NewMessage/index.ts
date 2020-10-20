import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface INewMessage {
    count: number;
}

export class NewMessage extends Component<INewMessage> {
    constructor(props: INewMessage) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}