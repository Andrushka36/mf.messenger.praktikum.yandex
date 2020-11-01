export const template = `
    <div class="profile-section">
        <div class="profile__row profile-row">
            <a href="/edit-profile" class="profile-row__link">Изменить данные</a>
        </div>
        <div class="profile__row profile-row">
            <button class="profile-row__logout" type="button" onClick="{{ onClick }}">Выйти</button>
        </div>
    </div>
`;