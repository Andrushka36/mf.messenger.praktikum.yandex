# Проектная работа №1. Чат

1. [Описание](#описание)
2. [Функциональные возможности](#функциональные-возможности)
3. [Макет](#макет)
4. [Установка, запуск и сборка](#установка-запуск-и-сборка)
5. [Линтеры и тесты](#линтеры-и-тесты)
6. [Демо](#демо)
7. [Скриншоты](#скриншоты)

## Описание

Классный мессенджер, клиентская часть которого написана без использования JavaScript-библиотек/фреймворков.

Приложение написано в рамках обучения по курсу "Мидл фронтенд-разработчик" на Яндекс.Практикум.

## Функциональные возможности

### Регистрация и авторизация

Заходя в приложение, пользователь попадает на страницу авторизации для ввода учетных данных.
При необходимости пользователь может создать новую учетную запись, перейдя на страницу регистрации.

### Выбор чата, действия с чатом и отправка сообщений

После успешной авторизации пользователь попадает на страницу выбора чата.
При желании можно создать новый чат.

Пользователю доступны следующие действия при выборе соответствующего пункта меню в хедере чата:
- добавление пользователей в чат и их удаление;
- изменение аватарки чата;
- удаление чата.

Для отправки сообщения необходимо воспользоваться формой внизу чата.

### Просмотр профиля и его редактирование

Для просмотра своего профиля необходимо перейти по ссылке, расположенной наверху боковой панели.
Там пользователь может перейти на страницу редактирования профиля либо выйти из приложения, нажав соответствующую кнопку.
Посмотреть профиль другого участника чата можно, нажав на его ник в списке сообщений.

## Макет
[Ссылка](https://www.figma.com/file/w7dws8hp8JghA6RPqOXwPZ/Chat?node-id=0%3A1) на макет в Figma.

## Установка, запуск и сборка

1. Установите зависимости:

```
npm install
```

2. Запустите приложение локально:
```
npm run start
```

3. Перейдите по адресу: http://localhost:8888/.

4. Для сборки проекта воспользуйтесь командой:
```
npm run build
```

## Линтеры и тесты

```
npm run lint

npm run test
```

## Демо

Приложение доступно на [Heroku](https://cryptic-springs-91020.herokuapp.com/).

## Скриншоты

<table>
    <tbody>
        <tr>
            <td width="50%">
                <img src="https://github.com/Andrushka36/mf.messenger.praktikum.yandex/blob/master/screenshots/chat.jpg?raw=true" alt="Скриншот чата" />
            </td>
            <td width="50%">
                <img src="https://github.com/Andrushka36/mf.messenger.praktikum.yandex/blob/master/screenshots/add-users.jpg?raw=true" alt="Скриншот добавления пользователей" />
            </td>
        </tr>
        <tr>
            <td width="50%">
                <img src="https://github.com/Andrushka36/test1/blob/main/screenshots/registration.jpg" alt="Скриншот формы регистрации" />
            </td>
            <td width="50%">
                <img src="https://github.com/Andrushka36/mf.messenger.praktikum.yandex/blob/master/screenshots/profile.jpg?raw=true" alt="Скришонт профиля" />
            </td>
        </tr>
    </tbody>
</table>
