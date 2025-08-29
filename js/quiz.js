// Questões do quiz
const questions = [
    {
        id: 1,
        question: 'Qual é a principal diferença entre display: flex e display: grid?',
        options: [
            'Flex é unidimensional (linha OU coluna), Grid é bidimensional (linhas E colunas)',
            'Flex só funciona em elementos inline, Grid só em elementos block',
            'Flex é mais novo que Grid e tem melhor suporte nos navegadores',
            'Grid é apenas para layouts fixos, Flex para layouts responsivos'
        ],
        correct: 0,
        explanation: 'Flexbox é projetado para layout em um eixo (horizontal ou vertical) com "flex-direction", enquanto Grid permite controle simultâneo de linhas e colunas em uma grade bidimensional.'
    },
    {
        id: 2,
        question: 'Por que usar elementos semânticos como <article>, <section>, <nav> ao invés de <div>?',
        options: [
            'Elementos semânticos carregam mais rápido',
            'Divs são obsoletas no HTML5',
            'Melhor acessibilidade, SEO e manutenção do código',
            'Elementos semânticos têm estilos CSS predefinidos'
        ],
        correct: 2,
        explanation: 'Elementos semânticos fornecem significado ao conteúdo, ajudando leitores de tela, mecanismos de busca e outros desenvolvedores a entenderem melhor a estrutura e propósito do conteúdo.'
    },
    {
        id: 3,
        question: 'Qual é a melhor prática para armazenar senhas no frontend?',
        options: [
            'LocalStorage em formato JSON',
            'Cookies criptografados',
            'Nunca armazene senhas no frontend',
            'Base64 no SessionStorage'
        ],
        correct: 2,
        explanation: 'Senhas e dados sensíveis nunca devem ser armazenados no frontend por questões de segurança. A autenticação deve ser gerenciada pelo backend com tokens seguros.'
    },
    {
        id: 4,
        question: 'Por que usar "const" e "let" ao invés de "var" em JavaScript moderno?',
        options: [
            'São mais rápidos de processar',
            'Têm escopo de bloco e previnem hoisting não intencional',
            'Funcionam apenas em navegadores modernos',
            'Ocupam menos memória'
        ],
        correct: 1,
        explanation: '"const" e "let" têm escopo de bloco, tornando o código mais previsível e evitando problemas comuns de hoisting do "var". "const" ainda ajuda a prevenir reatribuições acidentais.'
    },
    {
        id: 5,
        question: 'Qual abordagem é mais eficiente para estilização responsiva?',
        options: [
            'Criar um arquivo CSS separado para cada breakpoint',
            'Usar !important em media queries',
            'Mobile-first com min-width em media queries',
            'Desktop-first com max-width em media queries'
        ],
        correct: 2,
        explanation: 'A abordagem mobile-first com min-width é mais manutenível e eficiente, pois começa com estilos básicos para dispositivos móveis e progressivamente melhora para telas maiores.'
    },
    {
        id: 6,
        question: 'Por que evitar o uso de !important no CSS?',
        options: [
            'Causa problemas de performance',
            'Não funciona em navegadores antigos',
            'Dificulta a manutenção e aumenta a especificidade desnecessariamente',
            'É uma prática obsoleta no CSS3'
        ],
        correct: 2,
        explanation: '!important quebra a cascata natural do CSS e pode levar a uma "guerra de especificidade", tornando o código difícil de manter e debugar. É melhor usar seletores bem estruturados.'
    },
    {
        id: 7,
        question: 'Qual é a melhor prática para carregar scripts externos?',
        options: [
            'Sempre no <head> com async',
            'No final do <body> ou usar defer no <head>',
            'Em qualquer lugar com preload',
            'Dentro de um DOMContentLoaded'
        ],
        correct: 1,
        explanation: 'Colocar scripts no final do <body> ou usar defer no <head> garante que o HTML seja carregado primeiro, melhorando a percepção de performance e evitando bloqueio de renderização.'
    },
    {
        id: 8,
        question: 'Como melhorar a performance de imagens em um site?',
        options: [
            'Sempre usar WebP com fallback para JPEG',
            'Usar apenas SVG para todas as imagens',
            'Comprimir, dimensionar corretamente e usar lazy loading',
            'Converter todas as imagens para Base64'
        ],
        correct: 2,
        explanation: 'Uma estratégia completa inclui: comprimir imagens sem perda significativa de qualidade, usar dimensões apropriadas para cada dispositivo e implementar lazy loading para carregar apenas quando necessário.'
    },
    {
        id: 9,
        question: 'Qual é a principal vantagem de usar CSS Grid sobre outras técnicas de layout?',
        options: [
            'É mais rápido de processar pelo navegador',
            'Funciona melhor em dispositivos móveis',
            'Permite layouts bidimensionais complexos com menos código',
            'Tem melhor suporte em navegadores antigos'
        ],
        correct: 2,
        explanation: 'CSS Grid permite criar layouts complexos em duas dimensões (linhas e colunas) de forma mais simples e com menos código aninhado, sendo ideal para layouts de página completos.'
    },
    {
        id: 10,
        question: 'Por que usar metodologias CSS como BEM ou SMACSS?',
        options: [
            'São exigências do W3C',
            'Melhoram a performance do CSS',
            'Organizam o código e evitam conflitos de especificidade',
            'São necessárias para layouts responsivos'
        ],
        correct: 2,
        explanation: 'Metodologias CSS fornecem convenções de nomenclatura e organização que tornam o código mais manutenível, escalável e previnem conflitos de especificidade em projetos grandes.'
    }
];

// Gerenciador do Quiz
const Quiz = {
    currentQuestion: 0,
    score: 0,
    answers: [],
    
    init() {
        this.questionContainer = document.querySelector('#question-container');
        this.resultsContainer = document.querySelector('#results-container');
        this.progressBar = document.querySelector('.progress-bar');
        this.bestScoreDisplay = document.querySelector('#best-score');
        
        this.loadBestScore();
        this.startQuiz();
        this.bindEvents();
    },

    bindEvents() {
        // Reiniciar quiz
        document.querySelector('#restart-quiz')?.addEventListener('click', () => {
            this.startQuiz();
        });

        // Ver respostas
        document.querySelector('#show-answers')?.addEventListener('click', () => {
            this.showExplanations();
        });
    },

    startQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.showQuestion();
        this.resultsContainer.classList.add('hidden');
        this.questionContainer.classList.remove('hidden');
    },

    showQuestion() {
        const question = questions[this.currentQuestion];
        
        // Atualiza progresso
        const progress = (this.currentQuestion / questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
        document.querySelector('#quiz-progress').setAttribute('aria-valuenow', progress);

        // Renderiza questão
        this.questionContainer.innerHTML = `
            <div class="question">
                <h3>Questão ${this.currentQuestion + 1} de ${questions.length}</h3>
                <p>${question.question}</p>
            </div>
            <div class="options">
                ${question.options.map((option, index) => `
                    <button class="option" data-index="${index}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;

        // Adiciona eventos nas opções
        this.questionContainer.querySelectorAll('.option').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleAnswer(parseInt(e.target.dataset.index));
            });
        });
    },

    handleAnswer(selectedIndex) {
        const question = questions[this.currentQuestion];
        
        // Salva resposta
        this.answers.push({
            question: question.id,
            selected: selectedIndex,
            correct: selectedIndex === question.correct
        });

        // Atualiza pontuação
        if (selectedIndex === question.correct) {
            this.score++;
        }

        // Próxima questão ou finaliza
        if (this.currentQuestion < questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
        } else {
            this.finishQuiz();
        }
    },

    finishQuiz() {
        this.questionContainer.classList.add('hidden');
        this.resultsContainer.classList.remove('hidden');
        
        const finalScore = this.score;
        const totalQuestions = questions.length;
        const percentage = (finalScore / totalQuestions) * 100;

        // Atualiza melhor pontuação
        const bestScore = localStorage.getItem('quiz_best_score') || 0;
        if (finalScore > bestScore) {
            localStorage.setItem('quiz_best_score', finalScore);
            this.bestScoreDisplay.textContent = finalScore;
        }

        // Mostra resultado
        document.querySelector('#final-score').textContent = finalScore;
        
        let message = '';
        if (percentage >= 90) {
            message = 'Excelente! Você domina desenvolvimento web!';
        } else if (percentage >= 70) {
            message = 'Muito bom! Continue estudando!';
        } else if (percentage >= 50) {
            message = 'Você está no caminho certo. Revise os conceitos básicos.';
        } else {
            message = 'Não desanime! Sugerimos revisar o material e tentar novamente.';
        }

        document.querySelector('.results-message').textContent = message;
    },

    showExplanations() {
        this.questionContainer.innerHTML = `
            <div class="explanations">
                <h3>Explicações</h3>
                ${this.answers.map((answer, index) => {
                    const question = questions[index];
                    return `
                        <div class="explanation-item ${answer.correct ? 'correct' : 'incorrect'}">
                            <p><strong>Questão ${index + 1}:</strong> ${question.question}</p>
                            <p><strong>Sua resposta:</strong> ${question.options[answer.selected]}</p>
                            <p><strong>Resposta correta:</strong> ${question.options[question.correct]}</p>
                            <p><strong>Explicação:</strong> ${question.explanation}</p>
                        </div>
                    `;
                }).join('')}
            </div>
            <button class="btn-primary" onclick="Quiz.startQuiz()">
                Tentar Novamente
            </button>
        `;

        this.questionContainer.classList.remove('hidden');
        this.resultsContainer.classList.add('hidden');
    },

    loadBestScore() {
        const bestScore = localStorage.getItem('quiz_best_score') || 0;
        this.bestScoreDisplay.textContent = bestScore;
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    Quiz.init();
});
