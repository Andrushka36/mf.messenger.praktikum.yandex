import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IProfileSection {
    content: Component[];
}

export class ProfileSection extends Component<IProfileSection> {
    constructor(props: IProfileSection) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}