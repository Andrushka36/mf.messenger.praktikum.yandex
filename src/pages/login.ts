import { LoginForm } from '../components/LoginForm';
import { LoginFormRow } from '../components/LoginFormRow';
import { SignInType } from '../models/signIn';
import { render } from '../utils/render';
import { isShortPassword } from '../utils/validation/isShortPassword';

const login = new LoginFormRow({
    label: 'Логин',
    name: 'login',
    type: 'text',
    value: 'username',
});

const password = new LoginFormRow({
    label: 'Пароль',
    name: 'password',
    type: 'password',
    value: 'password',
});

const loginForm = new LoginForm<SignInType>({
    buttonLabel: 'Авторизоваться',
    content: [
        login,
        password,
    ],
    linkHref: '/pages/registration',
    linkLabel: 'Нет аккаунта?',
    onSubmit: (values) => {
        console.log(values);
    },
    pageTitle: 'Вход',
    validator: {
        login: ({ login }) => {
            if (login === '') {
                return 'Обязательное поле';
            }
        },
        password: ({ password }) => {
            if (isShortPassword(password)) {
                return 'Минимальная длина пароля - 8 символов';
            }
        }
    }
});

render('#root', loginForm);