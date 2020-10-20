import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IChats {
    chatItems: Component[];
    content: Component;
    onChange: Function;
    pageTitle: string;
}

export class Chats extends Component<IChats> {
    constructor(props: IChats) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}