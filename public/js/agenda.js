// Exibir o mês atual no calendário
const currentMonthElement = document.getElementById('currentMonth');
const calendarDaysElement = document.getElementById('calendarDays');
const appointmentsTableBody = document.getElementById('appointmentsTableBody');

// Botões de navegação do mês
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

// Funções auxiliares para manipulação de datas
let currentDate = new Date();

function renderCalendar(date) {
    const month = date.getMonth();
    const year = date.getFullYear();

    // Atualizar o título do mês
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;

    // Limpar os dias do calendário
    calendarDaysElement.innerHTML = '';

    // Configurar os dias do mês
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    // Adicionar espaços antes do início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day');
        calendarDaysElement.appendChild(emptyCell);
    }

    // Preencher os dias do mês
    for (let day = 1; day <= lastDateOfMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = day;
        calendarDaysElement.appendChild(dayCell);
    }
}

// Inicializar o calendário
renderCalendar(currentDate);

// Navegar entre meses
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// Modais
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// Eventos para abrir/fechar modais
document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-id]');
    if (button && button.classList.contains('btn-edit')) {
        openModal('confirmationModal');
    } else if (button && button.classList.contains('btn-cancel')) {
        openModal('confirmationModal');
    }
});

document.addEventListener('click', (event) => {
    const closeButton = event.target.closest('.close-modal');
    if (closeButton) {
        const modal = closeButton.closest('.modal');
        if (modal) {
            closeModal(modal.id);
        }
    }
});

// Configurações de notificação
const emailNotif = document.getElementById('emailNotif');
const smsNotif = document.getElementById('smsNotif');
const browserNotif = document.getElementById('browserNotif');
const saveSettingsButton = document.getElementById('saveSettings');

saveSettingsButton.addEventListener('click', () => {
    const settings = {
        email: emailNotif.checked,
        sms: smsNotif.checked,
        browser: browserNotif.checked,
    };
    console.log('Configurações salvas:', settings);
    closeModal('settingsModal');
});

// Ações na tabela de compromissos
appointmentsTableBody.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) {
        const id = button.getAttribute('data-id');
        if (button.classList.contains('btn-edit')) {
            console.log(`Editar compromisso ID: ${id}`);
            openModal('confirmationModal');
        } else if (button.classList.contains('btn-cancel')) {
            console.log(`Cancelar compromisso ID: ${id}`);
            openModal('confirmationModal');
        }
    }
});
