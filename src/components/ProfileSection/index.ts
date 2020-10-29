import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IProfileSection } from './interfaces';

export class ProfileSection extends Component<IProfileSection> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}