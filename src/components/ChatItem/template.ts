export const template = `
    <li class="chat-item-wrapper">
        <div class="chat-item">
            <img class="chat-item__avatar" src="{{ avatarSrc }}" alt="{{ avatarAlt }}" width="47" height="47" />
            <h3 class="chat-item__title">
                <a href="{{ chatUrl }}" class="chat-item__link">{{ chatName }}</a>
            </h3>
            <div class="chat-item__message">{{ chatMessage }}</div>
            <div class="chat-item__time-wrapper">
                <div class="chat-item__time">{{ date }}</div>
            </div>
            {{ newMessage }}
        </div>
    </li>
`;