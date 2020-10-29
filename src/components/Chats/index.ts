import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChats } from './interfaces';

export class Chats extends Component<IChats> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}