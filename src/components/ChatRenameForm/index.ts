import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IChatRenameForm {
    callback: Function;
    title: string;
}

export class ChatRenameForm extends Component<IChatRenameForm> {
    constructor(props: IChatRenameForm) {
        super(props);

        this.message = this.props.title;
    }

    public message: string = '';

    render() {
        const { callback, title } = this.props;

        return templator.compile(template, {
            title,
            onChange: (event: Event) => {
                const { target } = event;
                const { value } = target as HTMLInputElement;

                this.message = value;
            },
            onSubmit: (e: Event) => {
                e.preventDefault();
                if (this.message !== '') {
                    console.log(`chat_name: ${this.message}`);
                    callback();
                }
            },
        });
    }

    componentDidMount() {
        this.hide();
    }

    componentDidUpdate() {
        const element = this.getContent()
        if (element instanceof HTMLElement && element.style.display !== 'none') {
            element.querySelector('input')?.select();
        }
    }
}