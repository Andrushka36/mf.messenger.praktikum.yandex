import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { httpTransport } from '../../lib/HTTPTransport';

export class ProfileViewFooter extends Component<{}> {
    render() {
        return templator.compile(template, {
            onClick: () => {
                httpTransport.post('/auth/logout');
            },
        });
    }
}