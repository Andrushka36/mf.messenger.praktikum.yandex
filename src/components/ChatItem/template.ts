export const template = `
    <li class="chat-item-wrapper">
        <div class="{{ className }}">
            <img class="chat-item__avatar" src="{{ avatar }}" alt="Аватарка беседы {{ chatName }}" width="47" height="47" />
            <h3 class="chat-item__title">
                <a href="/chats/{{ id }}" class="chat-item__link">{{ title }}</a>
            </h3>
            $if[[
                (( {{ newMessage }} )),
                (( <div class="chat-item__new-message">{{ newMessage }}</div> ))
            ]]
        </div>
    </li>
`;
