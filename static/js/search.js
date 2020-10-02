window.addEventListener('load', () => {
    const search = document.querySelector('.js-input-search');

    search.addEventListener('input', ({ target: { value } }) => {
        console.log(`search: ${value}`);
    });
});