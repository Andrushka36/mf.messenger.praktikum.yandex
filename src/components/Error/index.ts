import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';

interface IError {
    code: number;
}

export class Err extends Component<IError> {
    constructor(props: IError) {
        super(props);
    }

    render() {
        return templator.compile(template, { ...this.props });
    }
}