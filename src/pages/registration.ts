import { LoginForm } from '../components/LoginForm';
import { LoginFormRow } from '../components/LoginFormRow';
import { SignUpFullType } from '../models/signUp';
import { isShortPassword } from '../utils/validation/isShortPassword';
import { isPhone } from '../utils/validation/isPhone';
import { isEmail } from '../utils/validation/isEmail';
import { signUpDTO } from '../api/signUpDTO';
import { errorHandler } from '../lib/ErrorHandler';
import { authorization } from '../lib/Authorization';
import { router } from '../lib/Router';
import { Err } from '../components/Error';

const firstName = new LoginFormRow({
    label: 'Имя',
    name: 'first_name',
    type: 'text',
    value: '',
});

const secondName = new LoginFormRow({
    label: 'Фамилия',
    name: 'second_name',
    type: 'text',
    value: '',
});

const login = new LoginFormRow({
    label: 'Логин',
    name: 'login',
    type: 'text',
    value: '',
});

const email = new LoginFormRow({
    label: 'Почта',
    name: 'email',
    type: 'email',
    value: '',
});

const phone = new LoginFormRow({
    label: 'Телефон',
    name: 'phone',
    type: 'tel',
    value: '',
});

const password = new LoginFormRow({
    label: 'Пароль',
    name: 'password',
    type: 'password',
    value: '',
});

const repeatPassword = new LoginFormRow({
    label: 'Пароль (еще раз)',
    name: 'repeat_password',
    type: 'password',
    value: '',
});

export const registration = new LoginForm<SignUpFullType>({
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
    linkHref: '/login',
    linkLabel: 'Войти',
    long: true,
    onSubmit: (values) => {
        signUpDTO
            .create(values)
            .then(() => authorization.check())
            .then(() => {
                router.go('/');
            })
            .catch(({ status, response  }) => {
                try {
                    const { reason } = JSON.parse(response);

                    if (reason === 'Login already exists') {
                        router.renderComponent(new Err({
                            code: status,
                            linkHref: '/registration',
                            linkLabel: 'Назад к регистрации',
                            text: 'Пользователь с таким логином уже существует',
                        }));
                    }
                    return;
                }
                catch (e) {

                }
                errorHandler.handle(status);
            });
    },
    pageTitle: 'Регистрация',
    validator: {
        email: ({ email }) => {
            if (!isEmail(email)) {
                return 'Укажите валидный email';
            }
        },
        password: ({ password }) => {
            if (isShortPassword(password)) {
                return 'Максимальная длина пароля - 8 символов';
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
    },
});
