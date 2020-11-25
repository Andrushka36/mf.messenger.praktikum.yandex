import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import './styles.sass';

export class Loader extends Component {
    render() {
        return templator.compile(template);
    }
}
