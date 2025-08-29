// Dados das tecnologias
const technologies = [
    {
        id: 'react',
        name: 'React',
        category: 'frontend',
        description: 'Biblioteca JavaScript para construir interfaces de usuário',
        level: 'intermediário',
        pros: [
            'Comunidade grande e ativa',
            'Ecossistema rico em bibliotecas',
            'Virtual DOM para melhor performance'
        ],
        cons: [
            'Curva de aprendizado para conceitos como hooks',
            'Necessidade de escolher outras bibliotecas para funcionalidades comuns'
        ],
        whenToUse: [
            'Aplicações de médio a grande porte',
            'Quando precisar de componentização robusta',
            'Para equipes que já conhecem JavaScript bem'
        ],
        whenToAvoid: 'Sites pequenos ou estáticos onde vanilla JS é suficiente',
        officialLink: 'https://reactjs.org'
    },
    {
        id: 'vue',
        name: 'Vue.js',
        category: 'frontend',
        description: 'Framework progressivo para construção de interfaces',
        level: 'intermediário',
        pros: [
            'Documentação excelente',
            'Curva de aprendizado suave',
            'Sistema de reatividade intuitivo'
        ],
        cons: [
            'Ecossistema menor que React',
            'Menos oportunidades no mercado'
        ],
        whenToUse: [
            'Projetos que precisam crescer gradualmente',
            'Quando a simplicidade é prioridade',
            'Para equipes menores'
        ],
        whenToAvoid: 'Quando o projeto exige bibliotecas específicas do React',
        officialLink: 'https://vuejs.org'
    },
    {
        id: 'node',
        name: 'Node.js',
        category: 'backend',
        description: 'Runtime JavaScript para servidor',
        level: 'intermediário',
        pros: [
            'Mesmo idioma no frontend e backend',
            'NPM (grande repositório de pacotes)',
            'Ótimo para APIs e microsserviços'
        ],
        cons: [
            'Não ideal para computação pesada',
            'Callback hell (se não usar async/await)'
        ],
        whenToUse: [
            'APIs REST e GraphQL',
            'Aplicações em tempo real',
            'Microsserviços'
        ],
        whenToAvoid: 'Processamento intensivo de CPU ou algoritmos complexos',
        officialLink: 'https://nodejs.org'
    },
    {
        id: 'python',
        name: 'Python/Django',
        category: 'backend',
        description: 'Linguagem versátil com framework web robusto',
        level: 'intermediário',
        pros: [
            'Sintaxe clara e legível',
            'Ótimo para processamento de dados',
            'Django Admin interface'
        ],
        cons: [
            'Pode ser mais lento que outras linguagens',
            'Django pode ser muito opinativo'
        ],
        whenToUse: [
            'Aplicações que lidam com dados/ML',
            'CMSs e admin dashboards',
            'Quando segurança é prioridade'
        ],
        whenToAvoid: 'Aplicações que precisam de performance extrema',
        officialLink: 'https://www.djangoproject.com'
    },
    {
        id: 'postgres',
        name: 'PostgreSQL',
        category: 'database',
        description: 'Sistema de banco de dados relacional avançado',
        level: 'intermediário',
        pros: [
            'Robusto e confiável',
            'Suporte a JSON e outros tipos',
            'Extensível com plugins'
        ],
        cons: [
            'Configuração inicial complexa',
            'Consome mais recursos que SQLite'
        ],
        whenToUse: [
            'Aplicações empresariais',
            'Quando precisa de tipos avançados',
            'Dados relacionais complexos'
        ],
        whenToAvoid: 'Aplicações pequenas onde SQLite seria suficiente',
        officialLink: 'https://www.postgresql.org'
    },
    {
        id: 'mongodb',
        name: 'MongoDB',
        category: 'database',
        description: 'Banco de dados NoSQL orientado a documentos',
        level: 'básico',
        pros: [
            'Flexível (schema dinâmico)',
            'Escalabilidade horizontal',
            'Ótimo com Node.js'
        ],
        cons: [
            'Não ideal para dados muito relacionais',
            'Consome mais memória'
        ],
        whenToUse: [
            'Dados semi-estruturados',
            'Aplicações em tempo real',
            'Prototipagem rápida'
        ],
        whenToAvoid: 'Dados altamente relacionais ou transações complexas',
        officialLink: 'https://www.mongodb.com'
    },
    {
        id: 'docker',
        name: 'Docker',
        category: 'devops',
        description: 'Plataforma de containerização',
        level: 'intermediário',
        pros: [
            'Ambiente consistente',
            'Isolamento de aplicações',
            'Fácil distribuição'
        ],
        cons: [
            'Overhead de recursos',
            'Curva de aprendizado inicial'
        ],
        whenToUse: [
            'Desenvolvimento em equipe',
            'Microsserviços',
            'Deploy consistente'
        ],
        whenToAvoid: 'Aplicações muito pequenas ou prototipagem rápida',
        officialLink: 'https://www.docker.com'
    },
    {
        id: 'jest',
        name: 'Jest',
        category: 'testing',
        description: 'Framework de testes JavaScript',
        level: 'intermediário',
        pros: [
            'Configuração zero',
            'Snapshots testing',
            'Mocking poderoso'
        ],
        cons: [
            'Pode ser lento em projetos grandes',
            'Mocks podem complicar testes'
        ],
        whenToUse: [
            'Projetos React',
            'Testes unitários JS',
            'Quando precisa de cobertura de código'
        ],
        whenToAvoid: 'Testes E2E (use Cypress/Playwright)',
        officialLink: 'https://jestjs.io'
    }
];

// Gerenciador de estado
const TechState = {
    currentFilter: localStorage.getItem('techFilter') || 'all',
    searchTerm: '',
    technologies,

    getFilteredTechs() {
        return this.technologies.filter(tech => {
            const matchesFilter = this.currentFilter === 'all' || tech.category === this.currentFilter;
            const matchesSearch = tech.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                tech.description.toLowerCase().includes(this.searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }
};

// UI Controller
const TechUI = {
    init() {
        this.techGrid = document.querySelector('.tech-grid');
        this.noResults = document.querySelector('#no-results');
        this.modal = document.querySelector('#tech-modal');
        this.searchInput = document.querySelector('#tech-search');
        this.exportBtn = document.querySelector('#export-csv');
        
        this.bindEvents();
        this.loadInitialState();
    },

    bindEvents() {
        // Filtros
        document.querySelector('.filters').addEventListener('click', e => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            
            this.updateFilter(btn.dataset.filter);
        });

        // Busca
        this.searchInput.addEventListener('input', e => {
            TechState.searchTerm = e.target.value;
            this.renderTechs();
        });

        // Atalho de busca
        document.addEventListener('keydown', e => {
            if (e.key === '/' && document.activeElement !== this.searchInput) {
                e.preventDefault();
                this.searchInput.focus();
            }
        });

        // Modal
        document.addEventListener('click', e => {
            if (e.target.closest('.tech-card')) {
                const id = e.target.closest('.tech-card').dataset.id;
                this.showModal(id);
            }
            if (e.target.closest('.close-modal')) {
                this.hideModal();
            }
        });

        // Exportar CSV
        this.exportBtn.addEventListener('click', () => this.exportToCSV());
    },

    loadInitialState() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === TechState.currentFilter) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            }
        });
        
        this.renderTechs();
    },

    updateFilter(filter) {
        // Atualiza botões
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const isActive = btn.dataset.filter === filter;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        // Atualiza estado
        TechState.currentFilter = filter;
        localStorage.setItem('techFilter', filter);
        
        this.renderTechs();
    },

    renderTechs() {
        const filteredTechs = TechState.getFilteredTechs();
        
        // Mostra/esconde mensagem de "sem resultados"
        this.noResults.classList.toggle('hidden', filteredTechs.length > 0);
        
        // Renderiza cards
        this.techGrid.innerHTML = filteredTechs.map(tech => `
            <article class="tech-card slide-up" data-id="${tech.id}" role="listitem">
                <div class="card-header">
                    <h3>${tech.name}</h3>
                    <span class="tech-level" data-level="${tech.level}">
                        ${tech.level}
                    </span>
                </div>
                <p>${tech.description}</p>
                
                <div class="pros-cons">
                    <div>
                        <h4>Pontos Fortes</h4>
                        <ul class="pros-cons-list pros">
                            ${tech.pros.map(pro => `<li>${pro}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4>Pontos Fracos</h4>
                        <ul class="pros-cons-list cons">
                            ${tech.cons.map(con => `<li>${con}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="card-footer">
                    <span class="tech-category">${tech.category}</span>
                    <button class="btn-text" aria-label="Ver mais sobre ${tech.name}">
                        Detalhes →
                    </button>
                </div>
            </article>
        `).join('');
    },

    showModal(techId) {
        const tech = technologies.find(t => t.id === techId);
        if (!tech) return;

        const modalContent = `
            <div class="modal-section">
                <h3>Quando escolher ${tech.name}?</h3>
                <ul>
                    ${tech.whenToUse.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-section">
                <h3>Prós</h3>
                <ul>
                    ${tech.pros.map(pro => `<li>${pro}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h3>Contras</h3>
                <ul>
                    ${tech.cons.map(con => `<li>${con}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h3>Quando evitar</h3>
                <p>${tech.whenToAvoid}</p>
            </div>

            <div class="modal-footer">
                <a href="${tech.officialLink}" 
                   class="btn-primary" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    Documentação Oficial
                </a>
            </div>
        `;

        document.querySelector('#modal-title').textContent = tech.name;
        document.querySelector('.modal-body').innerHTML = modalContent;
        
        this.modal.setAttribute('aria-hidden', 'false');
        this.modal.classList.add('active');
        
        // Foca no primeiro elemento focável
        const firstFocusable = this.modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        firstFocusable?.focus();
    },

    hideModal() {
        this.modal.setAttribute('aria-hidden', 'true');
        this.modal.classList.remove('active');
    },

    exportToCSV() {
        const filteredTechs = TechState.getFilteredTechs();
        const headers = ['Nome', 'Categoria', 'Nível', 'Descrição', 'Prós', 'Contras'];
        
        const csvContent = [
            headers.join(','),
            ...filteredTechs.map(tech => [
                tech.name,
                tech.category,
                tech.level,
                tech.description,
                tech.pros.join('; '),
                tech.cons.join('; ')
            ].map(field => `"${field}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'tecnologias.csv';
        link.click();
        URL.revokeObjectURL(link.href);
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    TechUI.init();
});
