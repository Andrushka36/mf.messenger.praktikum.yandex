import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { fake } from 'sinon';
import { Component } from './index';

let node: HTMLElement;

describe('Component', () => {
    before(() => {
        const window = new JSDOM(`<!DOCTYPE html>`).window;

        global.document = window.document;
        global.HTMLElement = window.HTMLElement;

        node = document.createElement('div');
        node.setAttribute('id', 'node');
    });

    it('checking render and getContent', () => {
       const component = new class MyComponent extends Component {
           render() {
               return node;
           }
       };

       expect(component.element).to.equal(node);

       expect(component.getContent()).to.equal(node);
    });

    it('checking componentDidMount', () => {
        const fakeFn = fake();

        new class MyComponent extends Component {
            componentDidMount() {
                fakeFn();
            };
        };

        expect(fakeFn.callCount).to.equal(1);
    });

    it('checking forceUpdate and componentDidUpdate', () => {
        const fakeRender = fake.returns(null);
        const fakeFn = fake();

        const component = new class MyComponent extends Component {
            render() {
                return fakeRender();
            }

            componentDidUpdate() {
                fakeFn();
            };
        };

        expect(fakeRender.callCount).to.equal(1);

        component.forceUpdate();

        expect(fakeRender.callCount).to.equal(2);
        expect(fakeFn.callCount).to.equal(1);
    });

    it('checking setProps', () => {
        const fakeRender = fake.returns(null);

        const component = new class MyComponent extends Component {
            render() {
                return fakeRender(this.props.prop);
            }
        }({ prop: 1 });

        expect(fakeRender.lastCall.lastArg).to.equal(1);

        component.setProps({ prop: 2 });

        expect(fakeRender.lastCall.lastArg).to.equal(2);
    });

    it('checking shouldComponentUpdate', () => {
        const fakeRender = fake.returns(null);

        const component = new class MyComponent extends Component {
            render() {
                return fakeRender();
            }

            shouldComponentUpdate(): boolean {
                return false;
            }
        }({ prop: 1 })

        component.setProps({ prop: 2 });

        expect(fakeRender.callCount).to.equal(1);
    });

    it('checking visibility methods', () => {
        const component = new class MyComponent extends Component {
            render() {
                return node;
            }
        };

        component.hide();

        expect(node.style.display).to.equal('none');

        component.show();

        expect(node.style.display).to.equal('block');

        component.visibilityToggle();

        expect(node.style.display).to.equal('none');
    });

    it('checking rerender call before render', () => {
        const fn = fake();

        new class MyComponent extends Component {
            prerender() {
                fn('prerender');
            }

            render() {
                fn('render');
                return null;
            }
        }

        expect(fn.firstCall.firstArg).to.be.equal('prerender');
        expect(fn.lastCall.firstArg).to.be.equal('render');
    });
});