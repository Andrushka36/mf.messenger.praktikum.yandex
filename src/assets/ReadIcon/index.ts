import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

export class ReadIcon extends Component<{}> {
    render() {
        return templator.compile(template);
    }
}