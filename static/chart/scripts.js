import { renderFormData } from '/js/scripts.js';

window.addEventListener('load', () => {
    renderFormData('.js-form-message');

    const buttons = document.querySelectorAll('.js-button-actions');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (e) {
            const siblingElement = this.nextElementSibling;

            if (siblingElement.className.split(' ').includes('js-modal-actions')) {
                siblingElement.style.display = siblingElement.style.display === 'block' ? 'none' : 'block';

                const closeModal = () => {
                    siblingElement.style.display = 'none';
                }

                setTimeout(() => {
                    document.addEventListener('click', () => {
                        closeModal();
                    }, {
                        once: true,
                    });
                }, 0);
            }
        });
    }

    renderFormData('.js-form-rename');

    const renameButton = document.querySelector('.js-button-rename');
    const renameForm = document.querySelector('.js-form-rename')

    renameButton.addEventListener('click', () => {
        const siblingRow = renameForm.previousElementSibling;

        renameForm.style.display = 'grid';
        siblingRow.style.display = 'none';

        renameForm.querySelector('input').select();
    });

    const deleteButton = document.querySelector('.js-button-delete');
    const deleteModal = document.querySelector('.js-modal-delete');

    deleteButton.addEventListener('click', () => {
        deleteModal.style.display = 'flex';
    });
});
