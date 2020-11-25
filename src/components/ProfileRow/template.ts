export const template = `
    <div class="profile__row profile-row">
        <div class="profile-row__title">{{ title }}</div>
        $if[[
            (( {{ writable }} )),
            (( <input type="{{ type }}" class="profile-row__value" value="{{ value }}" name="{{ name }}" /> )),
            (( <div class="profile-row__value">{{ value }}</div> ))
        ]]
    </div>
`;
