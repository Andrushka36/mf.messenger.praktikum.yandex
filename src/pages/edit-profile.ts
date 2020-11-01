import { Profile } from '../components/Profile';
import { ProfileForm } from '../components/ProfileForm';

export const editProfile = new Profile({
    avatarSrc: '/assets/avatar.jpg',
    content: new ProfileForm(),
    displayName: 'Васян',
    long: true,
    pageTitle: 'Редактирование профиля'
});
