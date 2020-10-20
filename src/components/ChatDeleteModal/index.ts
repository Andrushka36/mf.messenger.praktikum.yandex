import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

export class ChatDeleteModal extends Component<{}>{
    render() {
        return templator.compile(template, {
            onCancel: () => {
                console.log('cancel');
            },
            onConfirm: () => {
                console.log('confirm');
            },
        })
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