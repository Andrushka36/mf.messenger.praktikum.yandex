import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IModal {
    content: Component;
    x: 'left' | 'right';
    y: 'top' | 'bottom';
}

export class ChatActionsModal extends Component<IModal> {
    constructor(props: IModal) {
        super(props);
    }

    render() {
        const { content, x, y } = this.props;

        return templator.compile(template, {
            content,
            className: `${x === 'left' ? 'chat-modal_left' : 'chat-modal_right'} ${y === 'top' ? 'chat-modal_top' : 'chat-modal_bottom'}`
        });
    }

    closeModal = () => {
        this.hide();
    }

    componentDidMount() {
        this.hide();
    }

    componentDidUpdate() {
        const modal = this.getContent();

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