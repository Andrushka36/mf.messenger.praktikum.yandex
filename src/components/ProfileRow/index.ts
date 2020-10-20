import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { templateReadonly } from './templateReadonly';
import { templateWritable } from './templateWritable';

interface IProfileRowReadonly {
    title: string;
    value: string;
    writable?: false;
}

interface IProfileRowWritable {
    name: string;
    title: string;
    type: 'email' | 'file' | 'password' | 'tel' | 'text';
    value: string;
    writable: true;
}

export class ProfileRow extends Component<IProfileRowReadonly | IProfileRowWritable> {
    constructor(props: IProfileRowReadonly | IProfileRowWritable) {
        super(props);
    }

    render() {
        const { writable, ...others } = this.props;

        if (writable) {
            return templator.compile(templateWritable, { ...others });
        }
        return templator.compile(templateReadonly, { ...others });
    }
}