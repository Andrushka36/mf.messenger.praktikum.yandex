export const template = `
    <form class="message-form" onSubmit="{{ onSubmit }}">
        <div class="chat-row">
            {{ buttonAttach }}
            {{ attachModal }}
            <input type="text" class="message-form__input" placeholder="Сообщение" name="message" autocomplete="off" onChange="{{ onChange }}" />
            <button type="submit" class="message-form__submit" title="Отправить сообщение">
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="5.2002" width="11" height="1.6" fill="currentColor" />
                    <path d="M7 1L11 6L7 11" stroke-width="1.6" stroke="currentColor" />
                </svg>
            </button>            
        </div>
    </form>
`;