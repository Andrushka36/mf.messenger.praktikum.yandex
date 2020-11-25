export const template = `
    <main class="wrapper-center">
        <h1 class="visually-hidden">Ошибка</h1>
        <div class="error">
            <div class="error__title">{{ code }}</div>
            <div class="error__description">{{ text }}</div>
            <a href="{{ linkHref }}" class="error__link">{{ linkLabel }}</a>
        </div>
    </main>
`;
