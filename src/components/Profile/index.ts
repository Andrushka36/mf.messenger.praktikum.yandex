import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IProfile } from './interfaces';
import './styles.sass';

export class Profile extends Component<IProfile> {
    render() {
        const { long, ...others } = this.props;

        return templator.compile(template, {
            ...others,
            className: long ? 'profile_long' : '',
        });
    }
}
