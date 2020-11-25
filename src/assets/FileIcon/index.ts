import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

export class FileIcon extends Component<{}> {
    render() {
        return templator.compile(template);
    }
}
