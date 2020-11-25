import { Component } from '../Component';
import {
    AllowedComponent,
    AllowedComponentConstructor,
    TemplatorTreeType,
    TemplatorContextType,
} from './types';

class Templator {
    protected _allowed: AllowedComponentConstructor | null = null;

    public EVENTS: { [key: string]: string } = {
        onChange: 'input',
        onClick: 'click',
        onSubmit: 'submit',
    }

    public SVG_TAGS = ['svg', 'circle', 'path', 'stroke', 'rect', 'line', 'g'];

    public _if(template: string, ctx: TemplatorContextType): SVGElement | DocumentFragment | HTMLElement | Text {
        const results = template.match(/(\(\(.*?\)\))/ig) || [];

        const variable = (results[0].match(/{{ (\w+) }}/) || [])[1];

        const compileTemplate = (str: string) => {
            return templator.compile(str.replace(/^(\(\([ ]?)|([ ]?\)\))$/g, ''), ctx);
        };

        if (variable === undefined || ctx[variable]) {
            return compileTemplate(results[1]);
        } else {
            return results[2] ? compileTemplate(results[2]) : document.createDocumentFragment();
        }
    }

    private _setAttributes<T>(node: HTMLElement | SVGElement, attrs: RegExpMatchArray, ctx: TemplatorContextType) {
        const regexp = /(?<prop>[a-zA-Z0-9-]+)(="(?<value>.*?)")?/;
        attrs.forEach(attr => {
            const { prop, value = '' } = attr.match(regexp)?.groups as { prop: string, value?: string };

            let val: string | number | boolean | Function | undefined | T = value;
            const match = value?.match(/{{ (\w+) }}/);
            if (match !== null && match !== undefined && match[1] !== undefined) {
                if (typeof ctx[match[1]] === 'function') {
                    val = ctx[match[1]] as string | number | boolean | Function | undefined | T;
                } else {
                    const re = new RegExp(`{{ ${match[1]} }}`);
                    val = val?.replace(re, ctx[match[1]] as string || '');
                }
            }

            if (typeof val === 'function' && prop in this.EVENTS) {
                node.addEventListener(
                    this.EVENTS[prop],
                    val as (this: Document, ev: DocumentEventMap['blur' | 'change' | 'click' | 'submit']) => any
                );
            } else if (prop === 'class' && val !== undefined && node instanceof HTMLElement) {
                node.className = String(val);
            } else if (value === undefined) {
                node.setAttribute(prop, 'true');
            } else {
                node.setAttribute(prop, String(val));
            }
        });
    }

    private _createNode<T extends AllowedComponent>(element: TemplatorTreeType, ctx: TemplatorContextType): SVGElement | DocumentFragment | HTMLElement | Text {
        if (typeof element === 'string') {
            if (element.indexOf('$if') === 0) {
                return this._if(element, ctx);
            }

            let newItem = element;
            const vars = (element
                .match(/{{ (\w+) }}/g) || [])
                .reduce<string[]>((prev, current) => prev.includes(current) ? prev : [...prev, current.replace(/({)|(})|( )/g, '')], []);

            const fragment = document.createDocumentFragment();

            for (const v of vars) {
                const regexp = new RegExp(`{{ ${v} }}`, 'g');

                if (this._allowed !== null) {
                    if (ctx[v] instanceof this._allowed) {
                        const item = (ctx[v] as AllowedComponent).getContent();
                        if (item !== null) {
                            fragment.appendChild(item);
                        }
                    }
                    if (Array.isArray(ctx[v])) {
                        (ctx[v] as AllowedComponent[]).forEach(el => {
                            const item = el.getContent();
                            if (item !== null) {
                                fragment.appendChild(item);
                            }
                        });
                    }
                }

                newItem = newItem.replace(regexp, ctx[v] as string || '');
            }

            if (Array.from(fragment.children).length > 0) {
                return fragment;
            }

            return document.createTextNode(newItem);
        }

        const { children, fullTag, tag } = element;

        if (tag === '<>') {
            const fragment = document.createDocumentFragment();

            children.forEach(ch => {
                fragment.appendChild(this._createNode(ch, ctx));
            });

            return fragment;
        }

        const wrapper = !this.SVG_TAGS.includes(tag) ? document.createElement(tag) : document.createElementNS('http://www.w3.org/2000/svg', tag);

        const attrs = fullTag.match(/([a-zA-Z0-9-]+)="(.*?)"/g);

        if (attrs !== null) {
            this._setAttributes<T>(wrapper, attrs, ctx);
        }

        children.forEach((child) => {
            wrapper.appendChild(this._createNode(child, ctx));
        });

        return wrapper;
    }

    private _createTree(elements: string[]): TemplatorTreeType {
        const isTag = (str: string) => /<([a-zA-Z]+.*?)|(\/[a-zA-Z]+)>/ig.test(str);
        const parseFullTag = (str: string) => str.replace(/(<)|(( .*?)?\/?>)/g, '');
        const isSelfClosedTag = (str: string) => /<[a-zA-Z]+.*?\/>/ig.test(str);

        const firstElement = elements.shift() as string;

        if (firstElement[0] === '$') {
            return firstElement;
        }

        if (isTag(firstElement)) {
            const tag = parseFullTag(firstElement);
            const children = [];
            const end = `</${tag}>`;

            if (!isSelfClosedTag(firstElement)) {
                while (elements.length !== 0 && elements[0] !== end) {
                    children.push(this._createTree(elements));
                }

                elements.shift();
            }

            return { tag, fullTag: firstElement, children };
        } else if (firstElement === '<>') {
            const children = [];

            while (elements[0] !== '</>') {
                children.push(this._createTree(elements));
            }

            return { tag: firstElement, fullTag: firstElement, children };
        } else {
            return firstElement;
        }
    }

    private _parseTemplate(str: string) {
        const row = str.replace(/([\r\n]+)/g, '').replace(/ {2,}/g, '');
        const elements = row.match(/(\$if\[\[.*?]])|(<.*?>)|([^<]+)/ig) as string[];

        return elements.filter(item => item !== '');
    }

    public compile(str: string, ctx: TemplatorContextType = {}): SVGElement | DocumentFragment | HTMLElement | Text {
        // получим массив тегов и текстовых нод
        const elements = this._parseTemplate(str);

        // преобразуем этот массив в дерево
        const tree = this._createTree(elements);

        // выводим элементы дерева
        return this._createNode(tree, ctx);
    }
}

class ComponentTemplator extends Templator {
    protected _allowed = Component as unknown as AllowedComponentConstructor;
}

export const templator = new ComponentTemplator();
