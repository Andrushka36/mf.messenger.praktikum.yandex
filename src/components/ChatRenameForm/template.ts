export const template = `
    <form class="chat-header-form" onSubmit="{{ onSubmit }}">
        <input type="text" class="chat-header-form__input" value="{{ title }}" onChange="{{ onChange }}" />
        <button type="submit" class="chat-header-form__button">Сохранить</button>
    </form>
`;