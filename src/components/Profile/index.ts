import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IProfile {
    avatarSrc: string;
    content: Component | Component[];
    displayName: string;
    long?: boolean
    pageTitle: string;
}

export class Profile extends Component<IProfile> {
    constructor(props: IProfile) {
        super(props);
    }

    render() {
        const { long, ...others } = this.props;

        return templator.compile(template, {
            ...others,
            className: long ? 'profile_long' : '',
        });
    }
}