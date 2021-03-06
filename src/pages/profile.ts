import { Profile } from '../components/Profile';
import { ProfileInformation } from '../components/ProfileInformation';
import { ProfileRow } from '../components/ProfileRow';
import { ProfileViewFooter } from '../components/ProfileViewFooter';
import { Component } from '../lib/Component';
import { userStore } from '../stores';
import { getAvatarPath } from '../utils/getAvatarPath';
import { router } from '../lib/Router';
import { users } from '../lib/Users';

export const profile = new class ProfilePage extends Component {
    ProfileComponent!: Profile;

    prerender() {
        this.ProfileComponent = new Profile({
            avatarSrc: '/assets/avatar.jpg',
            content: [
                new ProfileInformation({
                    content: [
                        new ProfileRow({
                            title: 'Имя',
                            value: '-',
                        }),
                        new ProfileRow({
                            title: 'Фамилия',
                            value: '-',
                        }),
                        new ProfileRow({
                            title: 'Отображаемое имя',
                            value: '-',
                        }),
                        new ProfileRow({
                            title: 'Логин',
                            value: '-',
                        }),
                        new ProfileRow({
                            title: 'Почта',
                            value: '-',
                        }),
                        new ProfileRow({
                            title: 'Телефон',
                            value: '-',
                        }),
                    ],
                }),
                new ProfileViewFooter(),
            ],
            displayName: '-',
            pageTitle: 'Профиль',
        });
    }

    render() {
        return this.ProfileComponent.getContent();
    }

    async componentDidMount() {
        const profileId = router.getCurrentParam();

        const isCurrentProfile = profileId === undefined;

        const {
            firstName = '',
            secondName = '',
            displayName,
            login,
            email,
            phone,
            avatar,
        } = isCurrentProfile ? await Promise.resolve(userStore.getData()) : await users.get(Number(profileId));

        const content: (ProfileInformation | ProfileViewFooter)[] = [
            new ProfileInformation({
                content: [
                    new ProfileRow({
                        title: 'Имя',
                        value: firstName,
                    }),
                    new ProfileRow({
                        title: 'Фамилия',
                        value: secondName,
                    }),
                    new ProfileRow({
                        title: 'Отображаемое имя',
                        value: displayName || `${firstName} ${secondName}`,
                    }),
                    new ProfileRow({
                        title: 'Логин',
                        value: login,
                    }),
                    new ProfileRow({
                        title: 'Почта',
                        value: email,
                    }),
                    new ProfileRow({
                        title: 'Телефон',
                        value: phone,
                    }),
                ],
            }),
        ];

        if (isCurrentProfile) {
            content.push(new ProfileViewFooter());
        }

        this.ProfileComponent.setProps({
            avatarSrc: getAvatarPath(avatar as unknown as string),
            content,
            displayName: displayName || `${firstName} ${secondName}`,
        });
        this.forceUpdate();
    }
};
