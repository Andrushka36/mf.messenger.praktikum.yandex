import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { ProfileRow } from '../ProfileRow';
import {
    ChangePasswordRequestType,
    UserAvatarType,
    UserCommonType,
    UserRequestType,
    UserFullType,
    UserType,
} from '../../models/profile';
import { isEmail } from '../../utils/validation/isEmail';
import { isShortPassword } from '../../utils/validation/isShortPassword';
import { isPhone } from '../../utils/validation/isPhone';
import { Form } from '../../lib/Form';
import { ValidationFunctionType } from '../../lib/Form/types';
import { errorHandler } from '../../lib/ErrorHandler';
import { userStore } from '../../stores';
import { router } from '../../lib/Router';
import { userDTO } from '../../api/userDTO';
import { convertFromAPIResponse } from '../../utils/convertAPIResponse';

export class ProfileForm extends Component<UserCommonType & UserAvatarType> {
    constructor(props: UserCommonType & UserAvatarType) {
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
        firstName,
        secondName,
        displayName,
        login,
        email,
        phone,
        avatar,
        oldPassword,
        newPassword,
    }: UserFullType) => {
        const profile: UserRequestType = {
            first_name: firstName,
            second_name: secondName,
            display_name: displayName,
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
                    const newProfile = convertFromAPIResponse<UserType>(newData);
                    userStore.setData({ ...newProfile });
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
        ...this.checkRequiredFields('firstName', 'secondName', 'login', 'email', 'phone'),
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
            firstName = '',
            secondName = '',
            displayName,
            login,
            email,
            phone,
        } = this.props;

        const firstNameBlock = new ProfileRow({
            name: 'firstName',
            title: 'Имя',
            type: 'text',
            value: firstName,
            writable: true,
        });

        const secondNameBlock = new ProfileRow({
            name: 'secondName',
            title: 'Фамилия',
            type: 'text',
            value: secondName,
            writable: true,
        });

        const displayNameBlock = new ProfileRow({
            name: 'displayName',
            title: 'Отображаемое имя',
            type: 'text',
            value: displayName || `${firstName} ${secondName}`,
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

        const oldPasswordBlock = new ProfileRow({
            name: 'oldPassword',
            title: 'Текущий пароль',
            type: 'password',
            value: '',
            writable: true,
        });

        const newPasswordBlock = new ProfileRow({
            name: 'newPassword',
            title: 'Новый пароль',
            type: 'password',
            value: '',
            writable: true,
        });

        const repeatNewPasswordBlock = new ProfileRow({
            name: 'repeatNewPassword',
            title: 'Новый пароль (еще раз)',
            type: 'password',
            value: '',
            writable: true,
        });

        const avatarBlock = new ProfileRow({
            name: 'avatar',
            title: 'Загрузить аватар',
            type: 'file',
            value: '',
            writable: true,
        });

        this.content = [
            firstNameBlock,
            secondNameBlock,
            displayNameBlock,
            loginBlock,
            emailBlock,
            phoneBlock,
            oldPasswordBlock,
            newPasswordBlock,
            repeatNewPasswordBlock,
            avatarBlock,
        ];
    }

    render() {
        return templator.compile(template, {
            content: this.content,
        });
    }
}
