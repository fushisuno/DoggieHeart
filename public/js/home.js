
const slides = [
    {
        image: '../img/slide-01.jpg',
        title: 'Cuidando com Carinho do Seu Pet',
        description: 'Facilitamos o acompanhamento da saúde do seu melhor amigo'
    },
    {
        image: '../img/slide-02.jpg',
        title: 'Seu Pet Merece o Melhor',
        description: 'Acompanhamento veterinário simplificado e eficiente'
    },
    {
        image: '../img/slide-03.jpg',
        title: 'Tecnologia a Favor do Bem-Estar',
        description: 'Todas as informações do seu pet em um só lugar'
    }
];

let currentSlide = 0;
const slider = document.querySelector('.slider');

// Criar slides iniciais
slides.forEach((slide, index) => {
    const div = document.createElement('div');
    div.className = `slide ${index === 0 ? 'active' : ''}`;
    div.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${slide.image}')`;

    div.innerHTML = `
    <div class="slide-content">
      <h1>${slide.title}</h1>
      <p>${slide.description}</p>
      <a href="" class="cta-button">Comece Agora</a>
    </div>
  `;

    slider.appendChild(div);
});

// Função para trocar slides
function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Trocar slides automaticamente a cada 5 segundos
setInterval(nextSlide, 5000);

// Video Modal Functionality
const videoContainer = document.querySelector('.video-container');
const videoModal = document.querySelector('.video-modal');
const videoIframe = document.querySelector('.video-modal iframe');
const videoUrl = "https://www.youtube.com/embed/9VHTDhwo9u0"; // Replace with actual video ID

videoContainer.addEventListener('click', () => {
    videoModal.classList.add('active');
    videoIframe.src = videoUrl;
});


videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        videoIframe.src = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        videoModal.classList.remove('active');
        videoIframe.src = '';
    }
});

function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    // Here you would typically send the email to your backend
    alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
    event.target.reset();
    return false;
}

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

document.addEventListener('click', function (event) {
    if (event.target.matches('[data-modal-target]')) {
        const modalId = event.target.getAttribute('data-modal-target');
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