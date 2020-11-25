export const template = `
    <div class="chats-wrapper">
        <h1 class="visually-hidden">{{ pageTitle }}</h1>
        <aside class="chats-wrapper__aside">
            <div class="link-chats-aside-wrapper">
                <a href="/profile" class="link-chats-aside">Профиль</a>
            </div>
            <div class="link-chats-aside-wrapper">
                <button class="link-chats-aside" type="button" onClick="{{ onCreateChatButtonClick }}">Создать чат</button>
            </div>
            <div class="chats-search">
                <input type="search" class="chats-search__input js-chats-search-input" placeholder="Поиск" name="search" autocomplete="off" onChange="{{ onChange }}" value="{{ searchValue }}" />
            </div>
            <section class="chats-list">
                <h2 class="visually-hidden">Список чатов</h2>
                $if[[
                    (( {{ areChatsExist }} ))
                    ((
                        <ul class="chats-list__content">
                            {{ chatItems }}
                        </ul>
                    ))
                    ((
                        <div class="chats-list__no-chats">Нет чатов</div>
                    ))
                ]]
            </section>
        </aside>
        {{ content }}
        {{ chatCreateModal }}
    </div>
`;
