import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { IProfileRowReadonly, IProfileRowWritable } from './interfaces';

export class ProfileRow extends Component<IProfileRowReadonly | IProfileRowWritable> {
    render() {
        return templator.compile(template, { ...this.props });
    }
}
