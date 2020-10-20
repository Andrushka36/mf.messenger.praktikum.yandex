export const template = `
    <div class="modal-delete js-modal-delete">
        <div class="modal-delete__content">
            <div class="modal-delete__title">Вы хотите удалить чат?</div>
            <button class="modal-delete__button modal-delete__button_confirm" type="button" onClick="{{ onConfirm }}">Удалить</button>
            <button class="modal-delete__button modal-delete__button-cancel" type="button" onClick="{{ onCancel }}">Отменить</button>
        </div>
    </div>
`;