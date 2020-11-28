import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { ChatActionsButton } from '../ChatActionsButton';
import { ChatActionsModal } from '../ChatActionsModal';
import { AttachIcon } from '../../assets/AttachIcon';
import { ChatActions } from '../ChatActions';
import { ChatActionsItem } from '../ChatActionsItem';
import { PhotoIcon } from '../../assets/PhotoIcon';
import { FileIcon } from '../../assets/FileIcon';
import { LocationIcon } from '../../assets/LocationIcon';
import { IMessageForm } from './types';

export class MessageForm extends Component<IMessageForm> {
    constructor(props: IMessageForm) {
        super(props);
    }

    public attachFormMessageModal!: ChatActionsModal;

    public buttonFormMessageAttach!: ChatActionsButton;

    public message: string = '';

    public prerender() {
        this.attachFormMessageModal = new ChatActionsModal({
            content: new ChatActions({
                buttons: [
                    new ChatActionsItem({
                        icon: new PhotoIcon(),
                        label: 'Фото или Видео',
                        onClick: () => console.log('Фото или Видео'),
                    }),
                    new ChatActionsItem({
                        icon: new FileIcon(),
                        label: 'Файл',
                        onClick: () => console.log('Файл'),
                    }),
                    new ChatActionsItem({
                        icon: new LocationIcon(),
                        label: 'Локация',
                        onClick: () => console.log('Локация'),
                    }),
                ],
            }),
            x: 'left',
            y: 'top',
        });

        const attachFormMessageModalToggle = () => {
            this.attachFormMessageModal.visibilityToggle();
        };

        this.buttonFormMessageAttach = new ChatActionsButton({
            className: 'message-form__attach',
            icon: new AttachIcon(),
            onClick: attachFormMessageModalToggle,
            title: 'Добавить вложение',
        });
    }

    render() {
        return templator.compile(template, {
            attachModal: this.attachFormMessageModal,
            buttonAttach: this.buttonFormMessageAttach,
            onChange: ({ target }: Event) => {
                const { value } = target as HTMLInputElement;

                this.message = value;
            },
            onSubmit: (e: Event) => {
                e.preventDefault();
                const { onSubmit } = this.props;

                if (this.message !== '' && onSubmit !== undefined) {
                    onSubmit(this.message);
                    this.message = '';
                    this.forceUpdate();
                }
            },
            value: this.message,
        });
    }

    componentDidUpdate() {
        if (this.element instanceof HTMLElement) {
            const input = this.element.querySelector<HTMLInputElement>('[name="message"]');

            if (input instanceof HTMLInputElement && !(document.activeElement instanceof HTMLInputElement)) {
                input.focus();

                if (this.message !== '') {
                    input.selectionStart = this.message.length;
                }
            }
        }
    }
}
