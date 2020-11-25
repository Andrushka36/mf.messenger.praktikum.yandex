import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { httpTransport } from '../../lib/HTTPTransport';
import { authorization } from '../../lib/Authorization';
import { router } from '../../lib/Router';

export class ProfileViewFooter extends Component<{}> {
    render() {
        return templator.compile(template, {
            onClick: () => {
                httpTransport
                    .post('/auth/logout')
                    .then(() => {
                        authorization.logout();
                        router.go('/login');
                    });
            },
        });
    }
}
