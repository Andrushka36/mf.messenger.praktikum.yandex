export const template = `
        <main class="wrapper-center">
        <h1 class="visually-hidden">Ошибка</h1>
        <div class="error">
            <div class="error__title">{{ code }}</div>
            <div class="error__description">Мы уже фиксим</div>
            <a href="/pages/chats" class="error__link">Назад к чатам</a>
        </div>
    </main>
`;