import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

export class SelectChat extends Component<{}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return templator.compile(template);
    }
}