console.log("Entrou no arquivo JS");

// Seletores dos botões para foto
const choosePhotoButton = document.querySelector('.photo-buttons button:nth-child(1)');
const takePhotoButton = document.querySelector('.photo-buttons button:nth-child(2)');
const petPhotoInput = document.getElementById('petPhoto');
const petPhotoPreview = document.getElementById('petPhotoPreview');

// Função para abrir um modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        const overlay = document.querySelector('.overlay'); // Certifique-se de ter um overlay se necessário
        if (overlay) {
            overlay.classList.add('active');
        }
    }
}

// Função para fechar um modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// Evento para abrir um modal ao clicar em um botão com data-modal-target
document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-modal-target]');
    if (button) {
        const modalId = button.getAttribute('data-modal-target');
        openModal(modalId);
    }
});

// Evento para fechar um modal ao clicar no botão de cancelar
document.addEventListener('click', (event) => {
    const cancelButton = event.target.closest('.btn-cancel');
    const modal = event.target.closest('.modal');
    if (cancelButton && modal) {
        const modalId = modal.id;
        closeModal(modalId);
    }
});

// Evento para selecionar uma foto
choosePhotoButton.addEventListener('click', () => {
    petPhotoInput.click();
});

// Exibir preview da foto ao selecionar arquivo
petPhotoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            petPhotoPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        petPhotoPreview.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'/%3E%3C/svg%3E";
    }
});

// Evento para tirar foto (abre o seletor de arquivo)
takePhotoButton.addEventListener('click', () => {
    petPhotoInput.click();
});
