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

export class MessageForm extends Component<{}> {
    public attachFormMessageModal!: ChatActionsModal;

    public buttonFormMessageAttach!: ChatActionsButton;

    constructor(props: {}) {
        super(props);
    }

    public message: string = '';

    public prerender() {
        this.attachFormMessageModal = new ChatActionsModal({
            content: new ChatActions({
                buttons: [
                    new ChatActionsItem({
                        icon: new PhotoIcon({}),
                        label: 'Фото или Видео',
                        onClick: () => console.log('Фото или Видео'),
                    }),
                    new ChatActionsItem({
                        icon: new FileIcon({}),
                        label: 'Файл',
                        onClick: () => console.log('Файл'),
                    }),
                    new ChatActionsItem({
                        icon: new LocationIcon({}),
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
        }

        this.buttonFormMessageAttach = new ChatActionsButton({
            className: 'message-form__attach',
            icon: new AttachIcon({}),
            onClick: attachFormMessageModalToggle,
            title: 'Добавить вложение',
        });
    }

    render() {
        return templator.compile(template, {
            attachModal: this.attachFormMessageModal,
            buttonAttach: this.buttonFormMessageAttach,
            onChange: (event: Event) => {
                const { target } = event;
                const { value } = target as HTMLInputElement;

                this.message = value;
            },
            onSubmit: (e: Event) => {
                e.preventDefault();
                if (this.message !== '') {
                    console.log(`message: ${this.message}`);
                    this.forceUpdate();
                }
            },
        });
    }
}