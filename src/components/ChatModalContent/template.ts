export const template = `
    <div>
        $if[[
            (( {{ inputName }} )),
            (( <input class="modal-chat-input js-modal-chat-input" name="{{ inputName }}" onChange="{{ onChange }}" placeholder="{{ placeholder }}" autocomplete="off" value="{{ value }}" /> ))
        ]]
        $if[[
            (( {{ users }} )),
            ((
                <div class="modal-chat-users-list">
                    {{ users }}
                </div>
            ))
        ]]
    </div>
`;
