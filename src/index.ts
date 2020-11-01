import { Router } from './lib/Router';
import { error404 } from './pages/404';
import { error500 } from './pages/500';
import { chat } from './pages/chat';
import { chats } from './pages/chats';
import { editProfile } from './pages/edit-profile';
import { login } from './pages/login';
import { profile } from './pages/profile';
import { registration } from './pages/registration';
import { httpTransport } from './lib/HTTPTransport';

const router = new Router('#root');

router
    .use('/', chats, 'Выберите чат')
    .use('/404/', error404, 'Ошибка 404')
    .use('/500/', error500, 'Ошибка 500')
    .use('/chat/', chat, 'Чат')
    .use('/edit-profile/', editProfile, 'Редактирование профиля')
    .use('/login/', login, 'Вход')
    .use('/profile/', profile, 'Профиль')
    .use('/registration/', registration, 'Регистрация')
    .start();

httpTransport.setDomain('https://ya-praktikum.tech/api/v2');