import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IProfileInformation } from './interfaces';

export class ProfileInformation extends Component<IProfileInformation> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}
