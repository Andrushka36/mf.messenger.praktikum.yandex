import { router } from './lib/Router';
import { error400 } from './pages/400';
import { error404 } from './pages/404';
import { error500 } from './pages/500';
import { chat } from './pages/chat';
import { chats } from './pages/chats';
import { editProfile } from './pages/edit-profile';
import { login } from './pages/login';
import { profile } from './pages/profile';
import { registration } from './pages/registration';
import { errorHandler } from './lib/ErrorHandler';
import { authorization } from './lib/Authorization';
import { Loader } from './components/Loader';
import './theme/common.sass';

errorHandler
    .use(400, () => {
        router.renderComponent(error400);
    })
    .use(401, () => {
        window.location.reload();
    })
    .useFallback(() => {
        router.renderComponent(error500);
    });

router
    .useAuthorization(authorization)
    .use('/', chats, 'Выберите чат', { private: true })
    .use('/chats/', chat, 'Чат', { private: true })
    .use('/chats/:chatId', chat, 'Чат', { private: true })
    .use('/edit-profile', editProfile, 'Редактирование профиля', { private: true })
    .use('/profile', profile, 'Профиль', { private: true })
    .use('/profile/:profileId', profile, 'Профиль', { private: true })
    .use('/registration', registration, 'Регистрация', { onlyPublic: true })
    .useGuestPage('/login', login, 'Вход')
    .useLoader(new Loader())
    .useFallback('/404', error404, 'Ошибка 404')
    .start();
