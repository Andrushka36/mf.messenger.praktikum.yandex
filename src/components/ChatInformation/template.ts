export const template = `
    <div class="chat-row">
        <img class="chat-header__avatar" src="{{ avatarSrc }}" alt="{{ avatarAlt }}" width="34" height="34" />
        <div class="chat-header__information">
            <div class="chat-header__title">{{ chatName }}</div>
            <div class="chat-header__status">{{ status }}</div>
        </div>
        {{ chatActionsButton }}
        {{ chatActionsModal }}
    </div>
`;