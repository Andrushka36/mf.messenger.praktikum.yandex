export const template = `
    <label class="login-form__row">
        <input type="{{ type }}" class="login-form__input" value="{{ value }}" name="{{ name }}" />
        <span class="login-form__label">{{ label }}</span>
        <span class="login-form__error"></span>
    </label>
`;