import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { fake } from 'sinon';
import { Form } from './index';

let form: HTMLFormElement;

describe('Form', () => {
    before(() => {
        const { window } = new JSDOM('<!DOCTYPE html>');

        // @ts-ignore
        global.window = window;
        global.document = window.document;
        global.FormData = window.FormData;
    });

    beforeEach(() => {
        form = document.createElement('form');
        form.innerHTML = `
        <div>
            <input type="text" name="name" />
            <input type="text" name="age" />
        </div>
        <button type="submit">submit</button>
    `;

        document.body.appendChild(form);
    });

    afterEach(() => {
        form.remove();
    });

    it('checking changing input value and submit', () => {
        const onSubmit = fake();

        new Form({
            onSubmit,
            wrapper: form,
        });

        const name = document.querySelector('[name="name"]') as HTMLInputElement;
        name.value = 'Andrey';
        name.dispatchEvent(new window.Event('input'));

        document.querySelector('form')?.dispatchEvent(new window.Event('submit'));

        expect(onSubmit.lastCall.lastArg).to.deep.equal({ name: 'Andrey', age: '' });
    });

    it('checking show errors after blur input', () => {
        const onSubmit = fake();

        new Form({
            onSubmit,
            wrapper: form,
            validator: {
                age: ({ age }) => {
                    if (Number(age) < 18) {
                        return 'Вам должно быть больше 18-ти лет';
                    }
                },
            },
        });

        const age = document.querySelector('[name="age"]') as HTMLInputElement;
        age.value = '10';
        age.dispatchEvent(new window.Event('input'));
        age.dispatchEvent(new window.Event('blur'));

        expect(age.nextElementSibling?.textContent).to.equal('Вам должно быть больше 18-ти лет');
    });

    it('checking show errors after submit form', () => {
        const onSubmit = fake();

        new Form({
            onSubmit,
            wrapper: form,
            validator: {
                age: ({ age }) => {
                    if (Number(age) < 18) {
                        return 'Вам должно быть больше 18-ти лет';
                    }
                },
            },
        });

        const age = document.querySelector('[name="age"]') as HTMLInputElement;
        age.value = '10';
        age.dispatchEvent(new window.Event('input'));

        document.querySelector('form')?.dispatchEvent(new window.Event('submit'));

        expect(age.nextElementSibling?.textContent).to.equal('Вам должно быть больше 18-ти лет');

        expect(onSubmit.callCount).to.equal(0);
    });

    it('checking exclude value on submit', () => {
        const onSubmit = fake();

        new Form({
            onSubmit,
            wrapper: form,
            exclude: 'age',
        });

        const name = document.querySelector('[name="name"]') as HTMLInputElement;
        name.value = 'Andrey';
        name.dispatchEvent(new window.Event('input'));

        document.querySelector('form')?.dispatchEvent(new window.Event('submit'));

        expect(onSubmit.lastCall.lastArg).to.deep.equal({ name: 'Andrey' });
    });
});
