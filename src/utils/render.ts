import { Component } from '../lib/Component';

export const render = (selector: string, component: Component<any>) => {
    const root = document.querySelector(selector);
    const element = component.getContent();

    if (root !== null && element !== null) {
        root?.appendChild(element);
    }

    return root;
};
