import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IMessageAttach {
    alt: string;
    src: string;
    srcset: string;
}

export class MessageAttach extends Component<IMessageAttach> {
    constructor(props: IMessageAttach) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}