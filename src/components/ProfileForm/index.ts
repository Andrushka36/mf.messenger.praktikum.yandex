import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { ProfileRow } from "../ProfileRow";
import { UserFullType } from '../../models/profile';
import { isEmail } from '../../utils/validation/isEmail';
import { isShortPassword } from '../../utils/validation/isShortPassword';
import { isPhone } from '../../utils/validation/isPhone';
import { Form, ValidationFunctionType } from '../../lib/Form';

export class ProfileForm extends Component<{}> {
    constructor() {
        super({});

        if (this.element instanceof HTMLElement) {
            new Form({
                onSubmit: this.onSubmit,
                validator: this.validator,
                wrapper: this.element,
            });
        }
    }

    onSubmit = (values: UserFullType) => {
        console.log(values);
    }

    validator: Partial<{ [key in keyof UserFullType]: ValidationFunctionType<UserFullType> }> = {
        email: ({ email }) => {
            if (!isEmail(email)) {
                return 'Укажите валидный email'
            }
        },
        newPassword: ({ newPassword }) => {
            if (isShortPassword(newPassword)) {
                return 'Максимальная длина пароля - 8 символов'
            }
        },
        phone: ({ phone }) => {
            if (!isPhone(phone)) {
                return 'Укажите телефон в формате +7 XXX XXX XXXX';
            }
        },
        repeatNewPassword: ({ newPassword, repeatNewPassword }) => {
            if (newPassword !== repeatNewPassword) {
                return 'Пароли не совпадают';
            }
        },
    }

    content: Component[] = [];

    prerender() {
        const firstName = new ProfileRow({
            name: 'first_name',
            title: 'Имя',
            type: 'text',
            value: 'Вася',
            writable: true,
        });

        const secondName = new ProfileRow({
            name: 'second_name',
            title: 'Фамилия',
            type: 'text',
            value: 'Васин',
            writable: true,
        });

        const displayName = new ProfileRow({
            name: 'display_name',
            title: 'Отображаемое имя',
            type: 'text',
            value: 'Васян',
            writable: true,
        });

        const login = new ProfileRow({
            name: 'login',
            title: 'Логин',
            type: 'text',
            value: 'username',
            writable: true,
        });

        const email = new ProfileRow({
            name: 'email',
            title: 'Почта',
            type: 'email',
            value: 'pochta@yandex.ru',
            writable: true,
        });

        const phone = new ProfileRow({
            name: 'phone',
            title: 'Телефон',
            type: 'tel',
            value: '+7 903 123 4567',
            writable: true,
        });

        const oldPassword = new ProfileRow({
            name: 'oldPassword',
            title: 'Текущий пароль',
            type: 'password',
            value: 'password',
            writable: true,
        });

        const newPassword = new ProfileRow({
            name: 'newPassword',
            title: 'Новый пароль',
            type: 'password',
            value: 'password',
            writable: true,
        });

        const repeatNewPassword = new ProfileRow({
            name: 'repeatNewPassword',
            title: 'Новый пароль (еще раз)',
            type: 'password',
            value: 'зфыыцщкв',
            writable: true,
        });

        const avatar = new ProfileRow({
            name: 'avatar',
            title: 'Загрузить аватар',
            type: 'file',
            value: '',
            writable: true,
        });

        this.content = [
            firstName,
            secondName,
            displayName,
            login,
            email,
            phone,
            oldPassword,
            newPassword,
            repeatNewPassword,
            avatar,
        ];
    }

    render() {
        return templator.compile(template, {
            content: this.content,
        });
    }
}