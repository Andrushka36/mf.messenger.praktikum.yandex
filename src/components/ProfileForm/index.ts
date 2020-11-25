import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { ProfileRow } from '../ProfileRow';
import { ChangePasswordRequestType, UserAvatarType, UserFullType, UserRequestType } from '../../models/profile';
import { isEmail } from '../../utils/validation/isEmail';
import { isShortPassword } from '../../utils/validation/isShortPassword';
import { isPhone } from '../../utils/validation/isPhone';
import { Form } from '../../lib/Form';
import { ValidationFunctionType } from '../../lib/Form/types';
import { errorHandler } from '../../lib/ErrorHandler';
import { userStore } from '../../stores';
import { router } from '../../lib/Router';
import { userDTO } from '../../api/userDTO';

export class ProfileForm extends Component<UserRequestType &  UserAvatarType> {
    constructor(props: UserRequestType &  UserAvatarType) {
        super(props);

        if (this.element instanceof HTMLElement) {
            new Form<UserFullType>({
                onSubmit: this.onSubmit,
                validator: this.validator,
                wrapper: this.element,
            });
        }
    }

    onSubmit = ({
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
        avatar,
        oldPassword,
        newPassword,
    }: UserFullType) => {
        const profile = {
            first_name,
            second_name,
            display_name,
            login,
            email,
            phone,
        };

        const requests: Promise<any>[] = [];

        if (oldPassword && newPassword) {
            requests.push(
                userDTO
                    .get<ChangePasswordRequestType>('password')
                    .update({
                        oldPassword,
                        newPassword,
                    }),
            );
        }

        requests.push(
            userDTO
                .get<UserRequestType>('profile')
                .update(profile)
        );

        if (avatar && Object.keys(avatar).length !== 0) {
            const formData = new FormData();
            const input = document.querySelector('[name="avatar"]') as HTMLInputElement;
            formData.append('avatar', (input.files as FileList)[0]);

            requests.push(
                userDTO
                    .get<UserAvatarType>('profile/avatar')
                    .update(formData)
            );
        }

        Promise.allSettled(requests)
            .then(res => {
                const response = res.find(({ status }) => status === 'rejected');
                const newData = (res.reverse().find((promiseFulfilledResult) => (promiseFulfilledResult as PromiseFulfilledResult<any>).value) as PromiseFulfilledResult<any>)?.value;
                if (newData !== undefined) {
                    userStore.setData({ ...JSON.parse(newData) });
                }
                if (response !== undefined && response.status !== undefined) {
                    errorHandler.handle((response as PromiseRejectedResult).reason.status);
                } else {
                    router.go('/');
                }
            });
    }

    checkRequiredFields = (...keys: (keyof UserFullType)[]): Partial<Record<keyof UserFullType, ValidationFunctionType<UserFullType>>> => (
        keys.reduce((prev, curr) => ({
            ...prev,
            [curr]: (values: UserFullType) => {
                if (!values[curr]) {
                    return 'Обязательное поле';
                }
            },
        }),  {})
    )

    validator: Partial<{ [key in keyof UserFullType]: ValidationFunctionType<UserFullType> }> = {
        ...this.checkRequiredFields('first_name', 'second_name', 'login', 'email', 'phone'),
        email: ({ email }) => {
            if (!isEmail(email)) {
                return 'Укажите валидный email';
            }
        },
        newPassword: ({ newPassword, oldPassword }) => {
            if (oldPassword && !newPassword) {
                return 'Обязательное поле';
            }
            if (newPassword && isShortPassword(newPassword)) {
                return 'Максимальная длина пароля - 8 символов';
            }
        },
        phone: ({ phone }) => {
            if (!isPhone(phone)) {
                return 'Укажите телефон в формате +7 XXX XXX XXXX';
            }
        },
        repeatNewPassword: ({ newPassword, repeatNewPassword }) => {
            if (newPassword && newPassword !== repeatNewPassword) {
                return 'Пароли не совпадают';
            }
        },
    }

    content: Component[] = [];

    prerender() {
        const {
            first_name = '',
            second_name = '',
            display_name,
            login,
            email,
            phone,
        } = this.props;

        const firstName = new ProfileRow({
            name: 'first_name',
            title: 'Имя',
            type: 'text',
            value: first_name,
            writable: true,
        });

        const secondName = new ProfileRow({
            name: 'second_name',
            title: 'Фамилия',
            type: 'text',
            value: second_name,
            writable: true,
        });

        const displayName = new ProfileRow({
            name: 'display_name',
            title: 'Отображаемое имя',
            type: 'text',
            value: display_name || `${first_name} ${second_name}`,
            writable: true,
        });

        const loginBlock = new ProfileRow({
            name: 'login',
            title: 'Логин',
            type: 'text',
            value: login,
            writable: true,
        });

        const emailBlock = new ProfileRow({
            name: 'email',
            title: 'Почта',
            type: 'email',
            value: email,
            writable: true,
        });

        const phoneBlock = new ProfileRow({
            name: 'phone',
            title: 'Телефон',
            type: 'tel',
            value: phone,
            writable: true,
        });

        const oldPassword = new ProfileRow({
            name: 'oldPassword',
            title: 'Текущий пароль',
            type: 'password',
            value: '',
            writable: true,
        });

        const newPassword = new ProfileRow({
            name: 'newPassword',
            title: 'Новый пароль',
            type: 'password',
            value: '',
            writable: true,
        });

        const repeatNewPassword = new ProfileRow({
            name: 'repeatNewPassword',
            title: 'Новый пароль (еще раз)',
            type: 'password',
            value: '',
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
            loginBlock,
            emailBlock,
            phoneBlock,
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
