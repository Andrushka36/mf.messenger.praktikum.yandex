import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { templateReadonly } from './templateReadonly';
import { templateWritable } from './templateWritable';
import { IProfileRowReadonly, IProfileRowWritable } from './interfaces';

export class ProfileRow extends Component<IProfileRowReadonly | IProfileRowWritable> {
    render() {
        const { writable, ...others } = this.props;

        if (writable) {
            return templator.compile(templateWritable, { ...others });
        }
        return templator.compile(templateReadonly, { ...others });
    }
}