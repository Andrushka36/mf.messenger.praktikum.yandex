import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { render } from '../render';
import { Component } from '../../lib/Component';

describe('render', () => {
    before(() => {
        const { window } = new JSDOM('<!DOCTYPE html><div id="app"></div>');

        global.document = window.document;
    });

    it('checking append dom node', () => {
        const node = document.createElement('div');
        node.textContent = 'my node';

        const mockComponent = {
            getContent() {
                return node;
            },
        };

        render('#app', mockComponent as unknown as Component);

        expect(document.querySelector('#app')?.children[0]).to.equal(node);
    });
});
