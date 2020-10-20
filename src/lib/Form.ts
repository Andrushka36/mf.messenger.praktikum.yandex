import { cleanObject } from '../utils/clean-object';

export type ValidationFunctionType<T> = (data: T) => string | undefined;

export type FormType<T> = {
    onSubmit: (values: T) => void;
    wrapper: HTMLElement;
    validator?: Partial<{ [key in keyof T]: ValidationFunctionType<T> }>;
    exclude?: keyof T | (keyof T)[];
}

export class Form<T> {
    public form: HTMLFormElement | null;

    public formData: FormData;

    public errors: Partial<{ [key: string]: string }> = {};

    public touched: string[] = [];

    constructor({
        onSubmit,
        wrapper,
        validator = {},
        exclude,
    }: FormType<T>) {
        this.form = wrapper.tagName === 'FORM' ? wrapper as HTMLFormElement : wrapper.querySelector('form');

        this.formData = new FormData(this.form || undefined);

        this.formData.forEach((_, name) => {
            const input = this.form?.querySelector(`[name="${name}"`);

            input?.addEventListener('input', (event: Event) => {
                const { target } = event;
                const { value } = target as HTMLInputElement;

                this.setFieldValue(name, value);

                this.validate(validator);

                this.showErrors();

            });

            input?.addEventListener('blur', () => {
                this.setFieldTouched(name);

                this.validate(validator);

                this.showErrors();
            });
        });

        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();

            const isValid = Object.keys(this.errors).length === 0;

            if (isValid) {
                this.submit(onSubmit, exclude);
            } else {
                this.showErrors(true);
            }
        });

        this.validate(validator);

        this.touched = [];
    }

    public setFieldValue(name: string, value: string) {
        this.formData.set(name, value);
    }

    public setFieldTouched(name: string) {
        this.touched.push(name);
    }

    public showErrors(necessarily: boolean = false) {
        this.formData.forEach((_, name) => {

            const input = this.form?.querySelector(`[name="${name}"`);
            const parent = input?.parentElement;
            const errorElement = parent?.querySelector('.form-error') || document.createElement('div');

            errorElement.textContent = '';

            input?.classList.remove('form-input-error');

            const isTouched = this.touched.includes(name) || necessarily;

            const error = this.errors[name];

            if (isTouched && error) {
                input?.classList.add('form-input-error');
                errorElement.textContent = error;

                if (errorElement.parentElement === null) {
                    errorElement.classList.add('form-error');
                    parent?.appendChild(errorElement);
                }
            }
        });
    }

    public validate(validator: Partial<{ [key in keyof T]: ValidationFunctionType<T> }>) {
        let data: T = {} as T;

        this.formData.forEach((value, name) => {
            data = {
                ...data,
                [name]: value,
            }
        });

        this.errors = cleanObject(
            Object
                .entries<ValidationFunctionType<T>>(validator as { [key: string]: ValidationFunctionType<T> })
                .reduce((prev, [name, validate]) => ({ ...prev, [name]: validate(data) }), {})
        );
    }

    public submit(onSubmit: (values: T) => void, exclude?: keyof T | (keyof T)[]) {
        if (exclude !== undefined) {
            if (typeof exclude === 'string') {
                this.formData.delete(exclude);
            } else if (Array.isArray(exclude)) {
                exclude.forEach((item) => {
                    this.formData.delete(item as string);
                });
            }
        }

        let data: Partial<{ [key in keyof T]: any }> = {};

        this.formData.forEach((value, key) => {
            data[key as keyof T] = value;
        });

        onSubmit(data as T);
    }
}
