import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatAddUsersItem } from './interfaces';
import './styles.sass';

export class ChatAddUsersItem extends Component<IChatAddUsersItem> {
    constructor(props: IChatAddUsersItem) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}
