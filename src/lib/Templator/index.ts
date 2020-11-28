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

    private _setAttribute(element: HTMLElement, key: string, prop: string | Function) {
        if (typeof prop === 'function' && key in this.EVENTS) {
            element.addEventListener(this.EVENTS[key], prop as (this: Document, ev: DocumentEventMap['blur' | 'change' | 'click' | 'submit']) => any);
        } else if (key === 'class') {
            element.className = String(prop);
        } else {
            element.setAttribute(key, String(prop));
        }
    }

    private _setAttributes(element: HTMLElement | SVGElement, props: Record<string, string | Function>) {
        Object
            .entries(props)
            .map(([key, prop]) => {
                this._setAttribute(element as HTMLElement, key, prop);
            });
    }

    private _isCondition(str: string) {
        return str.indexOf('$if') === 0;
    }

    private _createNode(element: TemplatorTreeType, ctx: TemplatorContextType): SVGElement | DocumentFragment | HTMLElement | Text {
        if (typeof element === 'string') {
            if (this._isCondition(element)) {
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

        const { children, props, tag } = element;

        const node = !this.SVG_TAGS.includes(tag) ? document.createElement(tag) : document.createElementNS('http://www.w3.org/2000/svg', tag);

        this._setAttributes(node, props);

        children.forEach((child: TemplatorTreeType) => {
            node.appendChild(this._createNode(child, ctx));
        });

        return node;
    }

    private _getAttributeValue(val: string, ctx: TemplatorContextType): string | Function {
        const match = val.match(/{{ (\w+) }}/);

        if (match !== null && match !== undefined && match[1] !== undefined) {
            if (typeof ctx[match[1]] === 'function') {
                return ctx[match[1]] as string | Function;
            } else {
                const re = new RegExp(`{{ ${match[1]} }}`);
                return val.replace(re, ctx[match[1]] as string || '');
            }
        }

        return val;
    }

    private _parseAttributes(attrs: RegExpMatchArray, ctx: TemplatorContextType): Record<string, string | Function> {
        const regexp = /(?<prop>[a-zA-Z0-9-]+)(="(?<value>.*?)")?/;

        return attrs
            .map(attr => {
                const { prop, value = '' } = attr.match(regexp)?.groups as { prop: string, value?: string };

                return [prop, this._getAttributeValue(value, ctx)];
            })
            .filter((attr) => attr[1] !== '')
            .reduce((prev, [key, prop]) => ({ ...prev, [key as string]: prop }), {});
    }

    private _createTree(elements: string[], ctx: TemplatorContextType): TemplatorTreeType {
        const isTag = (str: string) => /<([a-zA-Z]+.*?)|(\/[a-zA-Z]+)>/ig.test(str);
        const getTag = (str: string) => str.replace(/(<)|(( .*?)?\/?>)/g, '');
        const isSelfClosedTag = (str: string) => /<[a-zA-Z]+.*?\/>/ig.test(str);

        const firstElement = elements.shift() as string;

        if (!this._isCondition(firstElement) && isTag(firstElement)) {
            const tag = getTag(firstElement);
            const children = [];
            const end = `</${tag}>`;
            const attrs = firstElement.match(/([a-zA-Z0-9-]+)="(.*?)"/g);
            let props: Record<string, string | Function> = {};

            if (attrs !== null) {
                props = this._parseAttributes(attrs, ctx);
            }

            if (!isSelfClosedTag(firstElement)) {
                while (elements.length !== 0 && elements[0] !== end) {
                    const tree = this._createTree(elements, ctx);
                    if (Array.isArray(tree)) {
                        children.push(...tree);
                    }  else {
                        children.push(tree);
                    }
                }

                elements.shift();
            }

            return { tag, props, children: children.filter(child => child !== '') };
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
        const tree = this._createTree(elements, ctx);

        // выводим элементы дерева
        return this._createNode(tree, ctx);
    }
}

class ComponentTemplator extends Templator {
    protected _allowed = Component as unknown as AllowedComponentConstructor;
}

export const templator = new ComponentTemplator();
