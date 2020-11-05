import { router } from './lib/Router';
import { error400 } from './pages/400';
import { error401 } from './pages/401';
import { error404 } from './pages/404';
import { error500 } from './pages/500';
import { chat } from './pages/chat';
import { chats } from './pages/chats';
import { editProfile } from './pages/edit-profile';
import { login } from './pages/login';
import { profile } from './pages/profile';
import { registration } from './pages/registration';
import { httpTransport } from './lib/HTTPTransport';
import { errorHandler } from './lib/ErrorHandler';

errorHandler
    .use(400, error400)
    .use(401, error401)
    .useFallback(500, error500);

router
    .use('/', chats, 'Выберите чат')
    .use('/chat', chat, 'Чат')
    .use('/edit-profile', editProfile, 'Редактирование профиля')
    .use('/login', login, 'Вход')
    .use('/profile', profile, 'Профиль')
    .use('/registration', registration, 'Регистрация')
    .useFallback('/404', error404, 'Ошибка 404')
    .start();

httpTransport.setDomain('https://ya-praktikum.tech/api/v2');