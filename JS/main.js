document.addEventListener('DOMContentLoaded', function() {
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    const formContato = document.getElementById('formContato');
    const formMessage = document.getElementById('formMessage');
    
    formContato.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value.trim();
        
        if (nome === '' || email === '' || assunto === '' || mensagem === '') {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Por favor, insira um email válido.', 'error');
            return;
        }
        
        showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        setTimeout(() => {
            formContato.reset();
            formMessage.classList.add('d-none');
        }, 3000);
    });
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `mt-3 ${type}`;
        formMessage.classList.remove('d-none');
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.livro-card').forEach(card => {
        observer.observe(card);
    });
    
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    const carouselButtons = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    carouselButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }
    });
    
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            const modalDialog = this.querySelector('.modal-dialog');
            modalDialog.style.transform = 'translateY(-50px)';
            modalDialog.style.opacity = '0';
            modalDialog.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        });
        
        modal.addEventListener('shown.bs.modal', function() {
            const modalDialog = this.querySelector('.modal-dialog');
            modalDialog.style.transform = 'translateY(0)';
            modalDialog.style.opacity = '1';
        });
    });
});