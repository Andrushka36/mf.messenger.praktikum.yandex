import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { fake } from 'sinon';
import { templator } from './index';
import { Component } from '../Component';

describe('Templator', () => {
    before(() => {
        const { window } = new JSDOM('<!DOCTYPE html>');

        global.document = window.document;
        global.HTMLElement = window.HTMLElement;
        global.MouseEvent = window.MouseEvent;
    });

    it('checking nested nodes', () => {
        const template = `
            <div>
                123
                <p>
                    <span>11</span>
                    <span>22</span>
                </p>
            </div>
        `;

        expect((templator.compile(template) as HTMLElement).outerHTML).to.equal('<div>123<p><span>11</span><span>22</span></p></div>');
    });

    it('checking attributes', () => {
        const template = '<div id="{{ id }}" class="classname {{ customClassName }}" data-id="11">11</div>';

        const node = templator.compile(template, { id: 'my-id', customClassName: 'my-classname' }) as HTMLElement;

        expect(node.getAttribute('id')).to.equal('my-id');
        expect(node.getAttribute('data-id')).to.equal('11');
        expect(node.className).to.equal('classname my-classname');
    });

    it('checking custom textContent', () => {
        const template = '<div>{{ content }}</div>';

        expect((templator.compile(template, { content: 'custom content' }) as HTMLElement).textContent).to.equal('custom content');
    });

    it('checking self-closed element', () => {
        const template = '<input type="text" value="36" />';

        expect((templator.compile(template) as HTMLElement).outerHTML).to.equal('<input type="text" value="36">');
    });

    it('checking function property', () => {
        const onClick = fake();

        const template = '<button onClick="{{ onClick }}">click</button>';

        const node = templator.compile(template, { onClick });

        document.body.appendChild(node);

        const button = document.querySelector('button') as HTMLButtonElement;
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(onClick.callCount).to.equal(1);

        (node as HTMLElement).remove();
    });

    it('checking render Component content', () => {
        const node = document.createElement('p');
        node.textContent = 'content';

        const component = new class MyComponent extends Component {
            render() {
                return node;
            }
        };

        const template = '<div>{{ content }}</div>';

        expect((templator.compile(template, { content: component }) as HTMLElement).outerHTML).to.equal('<div><p>content</p></div>');
    });

    describe('checking if', () => {
        it('checking when true', () => {
            const template1 = `
                <div>
                    $if[[ (( string )), (( <div>it's true!</div> )) ]]
                </div>
            `;

            expect((templator.compile(template1) as HTMLElement).outerHTML).to.equal("<div><div>it's true!</div></div>");

            const template2 = `
                <div>
                    $if[[ (( {{ condition }} )), (( <div>it's true too!</div> )) ]]
                </div>
            `;

            expect((templator.compile(template2, { condition: 36 > 35 }) as HTMLElement).outerHTML).to.equal("<div><div>it's true too!</div></div>");
        });

        it('checking when false', () => {
            const template1 = `
                <div>
                    $if[[ (( {{ condition }} )), (( <div>it's true!</div> )) ]]
                </div>
            `;

            expect((templator.compile(template1) as HTMLElement).outerHTML).to.equal('<div></div>');

            const template2 = `
                <div>
                    $if[[ (( {{ condition }} )), (( <div>it's true!</div> )), (( <div>it's false!</div> )) ]]
                </div>
            `;

            expect((templator.compile(template2, { condition: 36 > 37 }) as HTMLElement).outerHTML).to.equal("<div><div>it's false!</div></div>");

            const template3 = `
                <div>
                    $if[[ (( {{ condition }} )), (( <div>it's true!</div> )), (( <div>it's false too!</div> )) ]]
                </div>
            `;

            expect((templator.compile(template3) as HTMLElement).outerHTML).to.equal("<div><div>it's false too!</div></div>");
        });
    });
});
