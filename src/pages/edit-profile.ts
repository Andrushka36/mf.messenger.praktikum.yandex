import { Profile } from '../components/Profile';
import { ProfileForm } from '../components/ProfileForm';
import { render } from '../utils/render';

const profile = new Profile({
    avatarSrc: '/assets/avatar.jpg',
    content: new ProfileForm(),
    displayName: 'Васян',
    long: true,
    pageTitle: 'Редактирование профиля'
});

render('#root', profile);
