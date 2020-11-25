import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IModal } from './interfaces';

export class Modal extends Component<IModal>{
    constructor(props: IModal) {
        super(props);
    }

    render() {
        const {
            confirmText,
            content,
            title,
            onConfirm,
        } = this.props;
        return templator.compile(template, {
            confirmText,
            content,
            title,
            onCancel: () => {
                this.hide();
            },
            onConfirm: (e: Event) => {
                e.preventDefault();

                onConfirm(this);
            },
        });
    }

    closeModal = (event: Event) => {
        const path = event.composedPath() as unknown as NodeListOf<HTMLElement>;
        if (!Array.from(path).includes(this.element?.childNodes[0] as HTMLElement)) {
            this.hide();
        }
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
