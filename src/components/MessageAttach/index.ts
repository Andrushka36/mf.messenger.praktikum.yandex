import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IMessageAttach } from './interfaces';

export class MessageAttach extends Component<IMessageAttach> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}
