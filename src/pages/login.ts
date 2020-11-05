import { LoginForm } from '../components/LoginForm';
import { LoginFormRow } from '../components/LoginFormRow';
import { SignInType } from '../models/signIn';
import { isShortPassword } from '../utils/validation/isShortPassword';
import { signInDTO } from '../api/signInDTO';
import { errorHandler } from '../lib/ErrorHandler';

const loginElement = new LoginFormRow({
    label: 'Логин',
    name: 'login',
    type: 'text',
    value: 'username',
});

const passwordElement = new LoginFormRow({
    label: 'Пароль',
    name: 'password',
    type: 'password',
    value: 'password',
});

export const login = new LoginForm<SignInType>({
    buttonLabel: 'Авторизоваться',
    content: [
        loginElement,
        passwordElement,
    ],
    linkHref: '/registration',
    linkLabel: 'Нет аккаунта?',
    onSubmit: (values) => {
        signInDTO
            .create(values)
            .catch(({ status }) => {
                errorHandler.handle(status);
            });
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
