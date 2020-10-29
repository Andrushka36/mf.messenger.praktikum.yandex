import { Profile } from '../components/Profile';
import { ProfileSection } from '../components/ProfileSection';
import { ProfileRow } from '../components/ProfileRow';
import { ProfileViewFooter } from '../components/ProfileViewFooter';
import { render } from '../utils/render';

const profile = new Profile({
    avatarSrc: '/assets/avatar.jpg',
    content: [
        new ProfileSection({
            content: [
                new ProfileRow({
                    title: 'Имя',
                    value: 'Вася',
                }),
                new ProfileRow({
                    title: 'Фамилия',
                    value: 'Васин',
                }),
                new ProfileRow({
                    title: 'Отображаемое имя',
                    value: 'Васян',
                }),
                new ProfileRow({
                    title: 'Логин',
                    value: 'username',
                }),
                new ProfileRow({
                    title: 'Почта',
                    value: 'pochta@yandex.ru',
                }),
                new ProfileRow({
                    title: 'Телефон',
                    value: '+7 903 123 4567',
                }),
            ],
        }),
        new ProfileViewFooter(),
    ],
    displayName: 'Васян',
    pageTitle: 'Профиль'
});

render('#root', profile);