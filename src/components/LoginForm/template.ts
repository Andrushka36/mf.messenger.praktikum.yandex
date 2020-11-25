export const template = `
    <main class="wrapper-center">
        <form class="login-form {{ className }}">
            <h1 class="login-form__title">{{ pageTitle }}</h1>
            {{ content }}
            <button class="login-form__submit" type="submit">{{ buttonLabel }}</button>
            <a href="{{ linkHref }}" class="login-form__link">{{ linkLabel }}</a>
        </form>
    </main>
`;
