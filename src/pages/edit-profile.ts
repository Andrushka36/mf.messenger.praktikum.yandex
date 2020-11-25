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
            first_name = '',
            second_name = '',
            display_name,
            avatar,
        } = userStore.getData();

        this.ProfileComponent.setProps({
            avatarSrc: getAvatarPath(avatar),
            content: new ProfileForm({
                ...userStore.getData(),
            }),
            displayName: display_name || `${first_name} ${second_name}`,
        });
        this.forceUpdate();
    }
};
