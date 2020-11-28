import { Profile } from '../components/Profile';
import { ProfileForm } from '../components/ProfileForm';
import { Component } from '../lib/Component';
import { userStore } from '../stores';
import { getAvatarPath } from '../utils/getAvatarPath';

export const editProfile = new class EditProfilePage extends Component {
    ProfileComponent!: Profile;

    prerender() {
        this.ProfileComponent = new Profile({
            avatarSrc: '/assets/avatar.jpg',
            content: new ProfileForm({
                ...userStore.getData(),
            }),
            displayName: 'Васян',
            long: true,
            pageTitle: 'Редактирование профиля',
        });
    }

    render() {
        return this.ProfileComponent.getContent();
    }

    componentDidMount() {
        const {
            firstName = '',
            secondName = '',
            displayName,
            avatar,
        } = userStore.getData();

        this.ProfileComponent.setProps({
            avatarSrc: getAvatarPath(avatar),
            content: new ProfileForm({
                ...userStore.getData(),
            }),
            displayName: displayName || `${firstName} ${secondName}`,
        });
        this.forceUpdate();
    }
};
