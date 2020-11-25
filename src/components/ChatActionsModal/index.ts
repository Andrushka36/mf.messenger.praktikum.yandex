import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IChatActionsModal } from './interfaces';

export class ChatActionsModal extends Component<IChatActionsModal> {
    public getXClassName(x: 'left' | 'right') {
        return x === 'left' ? 'chat-modal_left' : 'chat-modal_right';
    }

    public getYClassName(y: 'top' | 'bottom') {
        return y === 'top' ? 'chat-modal_top' : 'chat-modal_bottom';
    }

    render() {
        const { content, x, y } = this.props;

        return templator.compile(template, {
            content,
            className: `${this.getXClassName(x)} ${this.getYClassName(y)}`,
        });
    }

    closeModal = () => {
        this.hide();
    }

    componentDidMount() {
        this.hide();
    }

    componentDidUpdate() {
        const modal = this.element;

        if (modal instanceof HTMLElement) {
            setTimeout(() => {
                if (modal.style.display === 'none') {
                    document.removeEventListener('click', this.closeModal);
                } else {
                    document.addEventListener('click', this.closeModal);
                }
            }, 0);
        }
    }
}
