// Módulo de navegação
const Navigation = {
    init() {
        this.menuButton = document.querySelector('.menu-hamburguer');
        this.navLinks = document.querySelector('.nav-links');
        this.bindEvents();
    },

    bindEvents() {
        this.menuButton.addEventListener('click', () => this.toggleMenu());
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Fecha menu com Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });
    },

    toggleMenu() {
        this.menuButton.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        
        const isExpanded = this.menuButton.classList.contains('active');
        this.menuButton.setAttribute('aria-expanded', isExpanded);
    },

    closeMenu() {
        this.menuButton.classList.remove('active');
        this.navLinks.classList.remove('active');
        this.menuButton.setAttribute('aria-expanded', false);
    }
};

// Módulo de tema
const ThemeManager = {
    init() {
        this.themeToggle = document.querySelector('#theme-toggle');
        this.updateThemeIcon = this.updateThemeIcon.bind(this);
        this.loadSavedTheme();
        this.bindEvents();
    },

    bindEvents() {
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Detecta mudança na preferência do sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener(
            'change', 
            e => this.handleSystemThemeChange(e)
        );

        // Atualiza ícone quando o tema muda
        document.body.addEventListener('themechange', this.updateThemeIcon);
    },

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        } else if (prefersDark) {
            document.body.classList.add('dark-theme');
        }
        
        this.updateThemeIcon();
    },

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Dispara evento customizado
        document.body.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: isDark ? 'dark' : 'light' }
        }));
    },

    handleSystemThemeChange(e) {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark-theme', e.matches);
            this.updateThemeIcon();
        }
    },

    updateThemeIcon() {
        const isDark = document.body.classList.contains('dark-theme');
        const toggle = document.querySelector('#theme-toggle');
        if (!toggle) return;
        
        // Atualiza aria-label
        toggle.setAttribute('aria-label', 
            `Mudar para tema ${isDark ? 'claro' : 'escuro'}`
        );

        // Atualiza ícone
        toggle.innerHTML = isDark ? `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        ` : `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
        `;
    }
};

// Módulo de Scroll
const ScrollManager = {
    init() {
        this.createBackToTopButton();
        this.bindEvents();
        this.setupSmoothScroll();
    },

    createBackToTopButton() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Voltar ao topo da página');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 15l-6-6-6 6"/>
            </svg>
        `;
        document.body.appendChild(button);
        this.backToTopButton = button;
    },

    bindEvents() {
        // Mostrar/ocultar botão "Voltar ao topo"
        window.addEventListener('scroll', () => {
            this.toggleBackToTopButton();
        });

        // Clique no botão "Voltar ao topo"
        this.backToTopButton?.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Animações de entrada
        this.setupIntersectionObserver();
    },

    toggleBackToTopButton() {
        if (!this.backToTopButton) return;
        
        if (window.pageYOffset > 300) {
            this.backToTopButton.classList.add('visible');
        } else {
            this.backToTopButton.classList.remove('visible');
        }
    },

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Adiciona animação de bounce no elemento alvo
                    targetElement.classList.add('bounce');
                    setTimeout(() => {
                        targetElement.classList.remove('bounce');
                    }, 500);
                }
            });
        });
    },

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // Observa cards e seções
        document.querySelectorAll('.card, section > .container').forEach(el => {
            el.classList.add('opacity-0');
            observer.observe(el);
        });
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    ThemeManager.init();
    ScrollManager.init();
});
