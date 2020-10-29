import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatInformation } from './interfaces';


export class ChatInformation extends Component<IChatInformation> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}