export const renderFormData = (selector) => {
    const form = document.querySelector(selector);

    form.addEventListener('submit', (e) => {
        const formData = new FormData(form);

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        })

        e.preventDefault();
    });
}
