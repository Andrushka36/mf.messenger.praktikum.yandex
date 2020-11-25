export const template = `
    <header class="chat-header">
        <div class="chat-row">
            <img class="chat-header__avatar" src="{{ avatar }}" alt="Аватарка беседы {{ title }}" width="34" height="34" />
            <div class="chat-header__title">{{ title }}</div>
            {{ actionsButton }}
            {{ actionsModal }}
            {{ addUsersModal }}
            {{ deleteChatModal }}
            {{ deleteUsersModal }}
        </div>
    </header>
`;
