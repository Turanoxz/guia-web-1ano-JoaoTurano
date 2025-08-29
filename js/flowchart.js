// Dados das etapas do projeto
const stages = [
    {
        id: 'discovery',
        name: 'Descoberta',
        icon: '🔍',
        deliverables: [
            'Análise do negócio e mercado',
            'Pesquisa de usuários',
            'Definição do escopo inicial'
        ],
        risks: [
            'Escopo mal definido',
            'Requisitos ambíguos',
            'Expectativas irrealistas'
        ]
    },
    {
        id: 'requirements',
        name: 'Requisitos',
        icon: '📝',
        deliverables: [
            'Documento de requisitos',
            'User stories',
            'Critérios de aceitação'
        ],
        risks: [
            'Falta de priorização',
            'Requisitos conflitantes',
            'Mudanças constantes'
        ]
    },
    {
        id: 'prototype',
        name: 'Protótipo',
        icon: '✏️',
        deliverables: [
            'Wireframes',
            'Protótipo interativo',
            'Feedback dos stakeholders'
        ],
        risks: [
            'Design não escalável',
            'Foco excessivo em estética',
            'Ignorar limitações técnicas'
        ]
    },
    {
        id: 'design',
        name: 'Design',
        icon: '🎨',
        deliverables: [
            'Style guide',
            'Design system',
            'Templates responsivos'
        ],
        risks: [
            'Inconsistência visual',
            'Problemas de acessibilidade',
            'Performance prejudicada'
        ]
    },
    {
        id: 'implementation',
        name: 'Implementação',
        icon: '💻',
        deliverables: [
            'Código fonte',
            'Documentação técnica',
            'Testes unitários'
        ],
        risks: [
            'Dívida técnica',
            'Bugs não identificados',
            'Atrasos no desenvolvimento'
        ]
    },
    {
        id: 'testing',
        name: 'Testes',
        icon: '🧪',
        deliverables: [
            'Plano de testes',
            'Relatórios de QA',
            'Testes de usabilidade'
        ],
        risks: [
            'Cobertura insuficiente',
            'Testes superficiais',
            'Ambiente instável'
        ]
    },
    {
        id: 'deploy-prep',
        name: 'Preparação Deploy',
        icon: '📦',
        deliverables: [
            'Ambiente de produção',
            'Pipeline CI/CD',
            'Plano de rollback'
        ],
        risks: [
            'Configuração errada',
            'Problemas de segurança',
            'Dependências faltando'
        ]
    },
    {
        id: 'launch',
        name: 'Publicação',
        icon: '🚀',
        deliverables: [
            'Site em produção',
            'Documentação final',
            'Treinamento da equipe'
        ],
        risks: [
            'Downtime não planejado',
            'Problemas de performance',
            'Falhas de segurança'
        ]
    },
    {
        id: 'maintenance',
        name: 'Monitoramento',
        icon: '📊',
        deliverables: [
            'Métricas de uso',
            'Relatórios de performance',
            'Plano de manutenção'
        ],
        risks: [
            'Problemas não detectados',
            'Custo operacional alto',
            'Degradação gradual'
        ]
    }
];

// Gerenciador do fluxograma
const FlowChart = {
    init() {
        this.svg = document.querySelector('#flow-svg');
        this.timeline = document.querySelector('.timeline-track');
        this.details = document.querySelector('.stage-details');
        
        this.renderFlow();
        this.renderTimeline();
        this.bindEvents();
    },

    bindEvents() {
        // Clique nas etapas
        document.addEventListener('click', e => {
            const stage = e.target.closest('[data-stage-id]');
            if (stage) {
                this.showStageDetails(stage.dataset.stageId);
            }
        });

        // Redimensionamento
        window.addEventListener('resize', () => {
            this.renderFlow();
        });
    },

    renderFlow() {
        const svg = this.svg;
        const width = svg.clientWidth;
        const height = 400;
        const padding = 50;
        const boxWidth = 120;
        const boxHeight = 60;

        // Limpa SVG
        svg.innerHTML = '';

        // Calcula posições
        const stageWidth = (width - 2 * padding) / (stages.length - 1);
        
        // Desenha conexões
        stages.forEach((stage, i) => {
            if (i < stages.length - 1) {
                const x1 = padding + i * stageWidth + boxWidth;
                const x2 = padding + (i + 1) * stageWidth;
                const y = height / 2;

                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', `M ${x1} ${y} L ${x2} ${y}`);
                path.setAttribute('stroke', 'var(--border-color)');
                path.setAttribute('stroke-width', '2');
                path.setAttribute('marker-end', 'url(#arrow)');
                svg.appendChild(path);
            }
        });

        // Desenha caixas
        stages.forEach((stage, i) => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            const x = padding + i * stageWidth;
            const y = height / 2 - boxHeight / 2;

            // Retângulo
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', boxWidth);
            rect.setAttribute('height', boxHeight);
            rect.setAttribute('rx', '8');
            rect.setAttribute('fill', 'var(--card-bg-color)');
            rect.setAttribute('stroke', 'var(--border-color)');
            rect.setAttribute('stroke-width', '2');
            
            // Texto
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x + boxWidth / 2);
            text.setAttribute('y', y + boxHeight / 2);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', 'var(--text-color)');
            text.textContent = stage.name;

            // Área clicável
            const button = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            button.setAttribute('x', x);
            button.setAttribute('y', y);
            button.setAttribute('width', boxWidth);
            button.setAttribute('height', boxHeight);
            button.setAttribute('fill', 'transparent');
            button.setAttribute('cursor', 'pointer');
            button.setAttribute('data-stage-id', stage.id);
            
            g.appendChild(rect);
            g.appendChild(text);
            g.appendChild(button);
            svg.appendChild(g);
        });
    },

    renderTimeline() {
        this.timeline.innerHTML = stages.map(stage => `
            <div class="timeline-item" data-stage-id="${stage.id}">
                <div class="timeline-icon">${stage.icon}</div>
                <div class="timeline-content">
                    <h4>${stage.name}</h4>
                </div>
            </div>
        `).join('');
    },

    showStageDetails(stageId) {
        const stage = stages.find(s => s.id === stageId);
        if (!stage) return;

        // Remove seleção anterior
        document.querySelectorAll('[data-stage-id]').forEach(el => {
            el.classList.remove('active');
        });

        // Marca items como ativos
        document.querySelectorAll(`[data-stage-id="${stageId}"]`).forEach(el => {
            el.classList.add('active');
        });

        // Atualiza detalhes
        this.details.innerHTML = `
            <h3>${stage.icon} ${stage.name}</h3>
            
            <div class="details-grid">
                <div class="details-section">
                    <h4>Entregas</h4>
                    <ul>
                        ${stage.deliverables.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="details-section">
                    <h4>Riscos Comuns</h4>
                    <ul class="risks">
                        ${stage.risks.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    FlowChart.init();
});
