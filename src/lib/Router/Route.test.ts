import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { JSDOM } from 'jsdom';
import { Route } from './Route';
import * as util from '../../utils/render';
import { Component } from '../Component';

describe('Route', () => {
    let component: Component;
    let node: HTMLElement;

    before(() => {
        const { window } = new JSDOM('<!DOCTYPE html>');

        global.document = window.document;
        global.HTMLElement = window.HTMLElement;

        node = document.createElement('div');
        node.setAttribute('id', 'node');

        component = new class MyComponent extends Component {
            render() {
                return node;
            }
        };
    });

    it('checking render block', () => {
        const route = new Route('/test', component, 'Заголовок', '#root');
        const renderStub = stub(util, 'render');

        route.render();

        expect(renderStub.args[0]).to.deep.equal(['#root', component]);

        expect(document.title).to.equal('Заголовок');

        renderStub.restore();

        document.title = '';
    });

    describe('checking match', () => {
        it('checking default path', () => {
            const route = new Route('/test', component, 'Заголовок', '#root');

            expect(route.match('/test1')).to.be.false;

            expect(route.match('/test')).to.be.true;
        });

        it('checking path with variable', () => {
            const route = new Route('/test/:testId', component, 'Заголовок', '#root');

            expect(route.match('/test')).to.be.false;

            expect(route.match('/test/sss')).to.be.true;

            expect(route.match('/test/sss/zzz')).to.be.false;
        });
    });

    it('checking leave', () => {
        const route = new Route('/test', component, 'Заголовок', '#root');

        const leaveSpy = spy(node, 'remove');

        route.leave();

        expect(leaveSpy.callCount).to.equal(1);

        leaveSpy.restore();
    });
});
