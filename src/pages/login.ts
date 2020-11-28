import { LoginForm } from '../components/LoginForm';
import { LoginFormRow } from '../components/LoginFormRow';
import { SignInType } from '../models/signIn';
import { isShortPassword } from '../utils/validation/isShortPassword';
import { signInDTO } from '../api/signInDTO';
import { errorHandler } from '../lib/ErrorHandler';
import { router } from '../lib/Router';
import { authorization } from '../lib/Authorization';

const loginElement = new LoginFormRow({
    label: 'Логин',
    name: 'login',
    type: 'text',
    value: '',
});

const passwordElement = new LoginFormRow({
    label: 'Пароль',
    name: 'password',
    type: 'password',
    value: '',
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
        return signInDTO
            .create(values)
            .then(() => authorization.check())
            .then(() => {
                const { pathname } = window.location;
                login.setProps({
                    error: '',
                });
                if (login.element instanceof HTMLElement) {
                    login.element.querySelector('form')?.reset();
                }
                if (pathname === '/login' || pathname === '/login/') {
                    router.go('/');
                } else {
                    router.go(pathname);
                }
            })
            .catch(({ status, response  }) => {
                try {
                    const { reason } = JSON.parse(response);

                    if (reason === 'Login or password is incorrect') {
                        login.setProps({
                            error: 'Логин или пароль введены неправильно',
                        });
                    }
                    return;
                }
                catch (e) {

                }
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
            if (password && isShortPassword(password)) {
                return 'Минимальная длина пароля - 8 символов';
            }
        },
    },
});
