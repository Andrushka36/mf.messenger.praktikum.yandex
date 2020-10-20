import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IMessageDate {
    date: string;
}

export class MessageDate extends Component<IMessageDate> {
    constructor(props: IMessageDate) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}