import { LoginForm } from '../components/LoginForm';
import { LoginFormRow } from '../components/LoginFormRow';
import { render } from '../utils/render';
import { SignUpFullType } from '../models/signUp';
import { isShortPassword } from '../utils/validation/isShortPassword';
import { isPhone } from '../utils/validation/isPhone';
import { isEmail } from '../utils/validation/isEmail';

const firstName = new LoginFormRow({
    label: 'Имя',
    name: 'first_name',
    type: 'text',
    value: 'Вася',
});

const secondName = new LoginFormRow({
    label: 'Фамилия',
    name: 'second_name',
    type: 'text',
    value: 'Васин',
});

const login = new LoginFormRow({
    label: 'Логин',
    name: 'login',
    type: 'text',
    value: 'username',
});

const email = new LoginFormRow({
    label: 'Почта',
    name: 'email',
    type: 'email',
    value: 'pochta@yandex.ru',
});

const phone = new LoginFormRow({
    label: 'Телефон',
    name: 'phone',
    type: 'tel',
    value: '+7 903 123 4567',
});

const password = new LoginFormRow({
    label: 'Пароль',
    name: 'password',
    type: 'password',
    value: 'password',
});

const repeatPassword = new LoginFormRow({
    label: 'Пароль (еще раз)',
    name: 'repeat_password',
    type: 'password',
    value: 'зфыыцокв',
});

const loginForm = new LoginForm<SignUpFullType>({
    buttonLabel: 'Зарегистрироваться',
    content: [
        firstName,
        secondName,
        login,
        email,
        phone,
        password,
        repeatPassword,
    ],
    excludeOnSubmit: 'repeat_password',
    linkHref: '/pages/login',
    linkLabel: 'Войти',
    long: true,
    onSubmit: (values) => {
        console.log(values);
    },
    pageTitle: 'Регистрация',
    validator: {
        email: ({ email }) => {
            if (!isEmail(email)) {
                return 'Укажите валидный email'
            }
        },
        password: ({ password }) => {
            if (isShortPassword(password)) {
                return 'Максимальная длина пароля - 8 символов'
            }
        },
        phone: ({ phone }) => {
            if (!isPhone(phone)) {
                return 'Укажите телефон в формате +7 XXX XXX XXXX';
            }
        },
        repeat_password: ({ password, repeat_password: repeatPassword }) => {
            if (password !== repeatPassword) {
                return 'Пароли не совпадают';
            }
        },
    }
});

render('#root', loginForm);