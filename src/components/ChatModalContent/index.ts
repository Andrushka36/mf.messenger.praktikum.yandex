import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatModalContent } from './interfaces';
import './styles.sass';

export class ChatModalContent extends Component<IChatModalContent> {
    constructor(props: IChatModalContent) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }

    // TODO: Убрать после написания Virtual DOM
    componentDidUpdate() {
        const loginInput = (this.element as HTMLElement).querySelector('.js-modal-chat-input') as HTMLInputElement | null;

        if (loginInput !== null) {
            loginInput.focus();
            loginInput.selectionStart = (this.props.value || '').length;
        }
    }
}
