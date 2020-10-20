export const template = `
    <div class="chats-wrapper">
        <h1 class="visually-hidden">{{ pageTitle }}</h1>
        <aside class="chats-wrapper__aside">
            <div class="link-profile-wrapper">
                <a href="/pages/profile" class="link-profile">Профиль</a>
            </div>
            <div class="chats-search">
                <input type="search" class="chats-search__input js-input-search" placeholder="Поиск" name="search"  autocomplete="off" onChange="{{ onChange }}" />
            </div>
            <section class="chats-list">
                <h2 class="visually-hidden">Список чатов</h2>
                <ul class="chats-list__content">
                    {{ chatItems }}
                </ul>
            </section>
        </aside>
        {{ content }}
    </div>
`;