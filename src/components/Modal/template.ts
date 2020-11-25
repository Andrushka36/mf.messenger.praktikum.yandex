export const template = `
    <div class="modal">
        <div class="modal__content">
            <div class="modal__title">{{ title }}</div>
            <form class="modal__form" onSubmit="{{ onConfirm }}">
                {{ content }}
                <div class="modal__buttons">
                    <button class="modal__button modal__button_confirm" type="submit">{{ confirmText }}</button>
                    <button class="modal__button modal__button-cancel" type="button" onClick="{{ onCancel }}">Отменить</button>
                </div>
            </form>
        </div>
    </div>
`;
