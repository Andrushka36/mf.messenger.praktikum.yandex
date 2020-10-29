import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChat } from './interfaces';

export class Chat extends Component<IChat> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}