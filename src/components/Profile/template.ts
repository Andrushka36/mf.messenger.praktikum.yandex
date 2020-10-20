export const template = `
    <div class="profile-page">
        <div class="profile__back-link-wrapper">
            <a href="/pages/chats" class="profile-back-link" title="Вернуться к выбору чата">
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="13" y="6.80005" width="11" height="1.6" transform="rotate(-180 13 6.80005)" fill="white" />
                    <path d="M6 11L2 6L6 1" stroke="white" stroke-width="1.6" />
                </svg>
            </a>
        </div>
        <main class="profile {{ className }}">
            <h1 class="visually-hidden">
                {{ pageTitle }}
            </h1>
            <img src="{{ avatarSrc }}" alt="Аватар пользователя {{ displayName }}" width="131" height="131" />
            <div class="profile__title">
                {{ displayName }}
            </div>
            {{ content }}
        </main>
    </div>
`;