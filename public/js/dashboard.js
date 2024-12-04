// Função para abrir o modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

// Função para fechar o modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        const form = modal.querySelector('form');
        if (form) {
            form.reset();  // Reseta o formulário ao fechar o modal
        }
    }
}

// Evento para abrir um modal ao clicar em um botão
document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-modal-target]');
    if (button) {
        const modalId = button.getAttribute('data-modal-target');
        openModal(modalId);
    }
});

// Evento para fechar o modal ao clicar no botão de cancelar
document.addEventListener('click', (event) => {
    const cancelButton = event.target.closest('.btn-cancel');
    const modal = event.target.closest('.modal');
    if (cancelButton && modal) {
        const modalId = modal.id;
        closeModal(modalId);
    }
});

// Evento para fechar o modal ao clicar no botão de fechar (×)
document.addEventListener('click', (event) => {
    const closeButton = event.target.closest('.close-modal');
    const modal = event.target.closest('.modal');
    if (closeButton && modal) {
        const modalId = modal.id;
        closeModal(modalId);
    }
});
