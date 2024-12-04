document.addEventListener("DOMContentLoaded", () => {
    // Função para ajustar a posição da sidebar
    const sidebar = document.querySelector(".sidebar");
    const footer = document.querySelector("footer");

    const adjustSidebar = () => {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (footerTop < windowHeight) {
            // Alcançou o rodapé
            sidebar.style.position = "absolute";
            sidebar.style.bottom = `${windowHeight - footerTop}px`;
        } else {
            // Sidebar fica fixa
            sidebar.style.position = "fixed";
            sidebar.style.bottom = "auto";
        }
    };

    // Chama a função de ajuste da sidebar ao rolar a página
    window.addEventListener("scroll", adjustSidebar);
    adjustSidebar(); // Executa uma vez para inicializar

    // Função para trocar de aba
    function switchTab(event, sectionId) {
        event.preventDefault();

        // Seleciona todos os elementos de aba e as seções correspondentes
        const tabs = document.querySelectorAll('.sidebar-menu a');
        const sections = document.querySelectorAll('.document-section');
        const documentsHeader = document.querySelector('.documents-header');
        const introSection = document.querySelector('.intro-section');
        const documentControls = document.querySelector(".document-controls");

        // Remove a classe 'active' de todas as abas e oculta todas as seções
        tabs.forEach(tab => tab.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Adiciona a classe 'active' para a aba clicada e exibe a seção correspondente
        const activeTab = event.currentTarget;
        activeTab.classList.add('active');
        document.getElementById(sectionId).classList.add('active');

        // Controla a exibição de documents-header e intro-section
        if (sectionId === 'todos') {
            documentsHeader.style.display = 'block';
            introSection.style.display = 'block';
            documentControls.classList.remove("shifted");
        } else {
            documentsHeader.style.display = 'none';
            introSection.style.display = 'none';
            documentControls.classList.add("shifted");
        }
    }

    // Associa os eventos de clique a todas as abas
    document.querySelectorAll('.sidebar-menu a').forEach(tab => {
        tab.addEventListener('click', (event) => {
            const sectionId = tab.href.split('#')[1] || tab.getAttribute('href').split('/').pop();
            switchTab(event, sectionId);
        });
    });
});
