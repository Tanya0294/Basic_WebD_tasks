/**
 * Tanya Rathore - AI/ML Engineer Portfolio Script
 * Handles:
 * 1. Mobile Menu Toggling
 * 2. Welcome Alert Button Interactivity
 * 3. Header Styling on Scroll
 * 4. Smooth Navigation Scrolling
 * 5. Dynamic Navbar Highlighting (Intersection Observer)
 * 6. Scroll Reveal Animations (Intersection Observer)
 * 7. Back to Top Button Visibility
 * 8. Contact Form Validation           [Task 2]
 * 9. Dynamic To-Do List (DOM Manip.)   [Task 2]
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // DOM Elements Cache
    // ==========================================
    const header        = document.getElementById('header');
    const menuToggle    = document.getElementById('menu-toggle');
    const navMenu       = document.getElementById('nav-menu');
    const navLinks      = document.querySelectorAll('.nav-link');
    const welcomeBtn    = document.getElementById('welcome-btn');
    const backToTopBtn  = document.getElementById('back-to-top');
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const sections      = document.querySelectorAll('section[id], header[id]');

    // ==========================================
    // 1. Mobile Menu Toggling
    // ==========================================
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            
        
    }

    // ==========================================
    // 2. Welcome Alert Button
    // ==========================================
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', () => {
            alert("Welcome to Tanya Rathore's AI/ML Portfolio!");
        
    }

    // ==========================================
    // 3. Header Styling & Back-To-Top on Scroll
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Add blur/shadow class when user scrolls down
        if (scrollY > 50) {
            header.classList.add('nav-scrolled');
        } else {
            header.classList.remove('nav-scrolled');
        }

        // Back-to-top button appearance
        if (scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    

    // ==========================================
    // 4. Smooth Navigation Scrolling
    // ==========================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = 70; // Matches navbar height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    
                }
            }
        
    

    // ==========================================
    // 5. Dynamic Navbar Highlighting on Scroll
    // ==========================================
    const navObserverOptions = {
        root: null,
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                
            }
        
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    

    // ==========================================
    // 6. Scroll Reveal Animations
    // ==========================================
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        
    }, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    


    // ==========================================================================
    // 8. CONTACT FORM — JavaScript Validation  [Task 2]
    // ==========================================================================

    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const submitBtn   = document.getElementById('contact-submit-btn');

    if (contactForm) {

        /**
         * Validates a single form field.
         * Applies CSS state classes and shows/hides inline error text.
         * Returns true when the field value is valid.
         */
        function validateField(fieldId, groupId, errorId, rules) {
            const field     = document.getElementById(fieldId);
            const group     = document.getElementById(groupId);
            const errorSpan = document.getElementById(errorId);

            if (!field) return true; // field not present — skip

            const val = field.value.trim();
            let errorMsg = '';

            // Required
            if (rules.required && val === '') {
                errorMsg = rules.requiredMsg || 'This field is required.';
            }
            // Minimum length (only when value isn't empty)
            else if (rules.minLength && val.length > 0 && val.length < rules.minLength) {
                errorMsg = rules.minLengthMsg || `Must be at least ${rules.minLength} characters.`;
            }
            // Email format
            else if (rules.email && val !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val)) {
                    errorMsg = 'Please enter a valid email address (e.g. you@example.com).';
                }
            }
            // Phone format (optional — only validate if user typed something)
            else if (rules.phone && val !== '') {
                const phoneRegex = /^[\d\s\+\-\(\)]{7,15}$/;
                if (!phoneRegex.test(val)) {
                    errorMsg = 'Please enter a valid phone number.';
                }
            }

            // Apply visual state
            if (errorMsg) {
                group.classList.add('has-error');
                group.classList.remove('is-valid');
                errorSpan.textContent = errorMsg;
                return false;
            } else {
                group.classList.remove('has-error');
                if (val !== '') group.classList.add('is-valid'); // green tick only when filled
                errorSpan.textContent = '';
                return true;
            }
        }

        // Field config — rules for each input
        const fieldConfigs = [
            {
                field: 'contact-name',
                group: 'group-name',
                error: 'error-name',
                rules: {
                    required: true,
                    minLength: 2,
                    requiredMsg: 'Please enter your full name.',
                    minLengthMsg: 'Name must be at least 2 characters long.'
                }
            },
            {
                field: 'contact-email',
                group: 'group-email',
                error: 'error-email',
                rules: {
                    required: true,
                    email: true,
                    requiredMsg: 'Please enter your email address.'
                }
            },
            {
                field: 'contact-subject',
                group: 'group-subject',
                error: 'error-subject',
                rules: {
                    required: true,
                    minLength: 3,
                    requiredMsg: 'Please enter a subject for your message.',
                    minLengthMsg: 'Subject must be at least 3 characters long.'
                }
            },
            {
                field: 'contact-phone',
                group: 'group-phone',
                error: 'error-phone',
                rules: { phone: true } // optional field
            },
            {
                field: 'contact-message',
                group: 'group-message',
                error: 'error-message',
                rules: {
                    required: true,
                    minLength: 10,
                    requiredMsg: 'Please write a message before sending.',
                    minLengthMsg: 'Your message must be at least 10 characters long.'
                }
            }
        ];

        // Live validation — validate on blur and re-validate on input if error is shown
        fieldConfigs.forEach(({ field, group, error, rules }) => {
            const el = document.getElementById(field);
            if (!el) return;

            el.addEventListener('blur', () => {
                validateField(field, group, error, rules);
            

            el.addEventListener('input', () => {
                const grp = document.getElementById(group);
                if (grp && grp.classList.contains('has-error')) {
                    validateField(field, group, error, rules);
                }
            
        

        // Form submit — run full validation pass
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const results = fieldConfigs.map(({ field, group, error, rules }) =>
                validateField(field, group, error, rules)
            );

            const allValid = results.every(Boolean);

            if (!allValid) {
                // Scroll first errored field into view and focus it
                const firstError = contactForm.querySelector('.has-error input, .has-error textarea');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' 
                    firstError.focus();
                }
                return;
            }

            // All valid — simulate sending (1.5 s delay)
            submitBtn.classList.add('btn-loading');
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>&nbsp; Sending...';

            setTimeout(() => {
                // Reset the form and all validation states
                contactForm.reset();
                fieldConfigs.forEach(({ group }) => {
                    const grp = document.getElementById(group);
                    if (grp) grp.classList.remove('has-error', 'is-valid');
                

                // Show success banner
                formSuccess.classList.add('visible');

                // Restore button
                submitBtn.classList.remove('btn-loading');
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

                // Auto-hide success banner after 6 seconds
                setTimeout(() => formSuccess.classList.remove('visible'), 6000);

            }, 1500);
        
    }


    // ==========================================================================
    // 9. DYNAMIC TO-DO LIST — DOM Manipulation  [Task 2]
    // ==========================================================================

    const todoInput     = document.getElementById('todo-input');
    const todoPriority  = document.getElementById('todo-priority');
    const todoAddBtn    = document.getElementById('todo-add-btn');
    const todoList      = document.getElementById('todo-list');
    const todoEmpty     = document.getElementById('todo-empty');
    const todoStats     = document.getElementById('todo-stats');
    const todoRemaining = document.getElementById('todo-remaining');
    const todoClearBtn  = document.getElementById('todo-clear-btn');
    const todoInputErr  = document.getElementById('todo-input-error');
    const filterBtns    = document.querySelectorAll('.todo-filter-btn');

    // Guard — to-do section may not be on the page
    if (!todoInput) return;

    // In-memory tasks array: { id, text, priority, completed, createdAt }
    let tasks = loadTasks();
    let currentFilter = 'all';

    // ---- LocalStorage helpers ----
    function saveTasks() {
        try {
            localStorage.setItem('tr_portfolio_tasks', JSON.stringify(tasks));
        } catch (_) { /* private/incognito mode or quota exceeded */ }
    }

    function loadTasks() {
        try {
            return JSON.parse(localStorage.getItem('tr_portfolio_tasks')) || [];
        } catch (_) {
            return [];
        }
    }

    // ---- Generate a tiny unique ID ----
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    // ---- Build a single <li> task element from a task object ----
    function createTaskElement(task) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        if (task.completed) li.classList.add('completed');
        li.dataset.id = task.id;

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');
        checkbox.checked = task.completed;
        checkbox.setAttribute('aria-label',
            `Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`);
        checkbox.addEventListener('change', () => toggleComplete(task.id));

        // Priority colour dot
        const dot = document.createElement('span');
        dot.classList.add('todo-priority-dot', `priority-dot-${task.priority}`);
        const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
        dot.title = `${priorityLabel} priority`;

        // Task text
        const span = document.createElement('span');
        span.classList.add('todo-item-text');
        span.textContent = task.text;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('todo-delete-btn');
        deleteBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.addEventListener('click', () => deleteTask(task.id, li));

        li.appendChild(checkbox);
        li.appendChild(dot);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        return li;
    }

    // ---- Render the task list based on current filter ----
    function renderTasks() {
        todoList.innerHTML = '';

        const filtered = tasks.filter(t => {
            if (currentFilter === 'active')    return !t.completed;
            if (currentFilter === 'completed') return t.completed;
            return true; // 'all'
        

        if (filtered.length === 0) {
            todoEmpty.classList.add('visible');
        } else {
            todoEmpty.classList.remove('visible');
            filtered.forEach(task => {
                todoList.appendChild(createTaskElement(task));
            
        }

        updateStats();
    }

    // ---- Update the "X tasks remaining" counter ----
    function updateStats() {
        const remaining = tasks.filter(t => !t.completed).length;
        todoRemaining.textContent = remaining === 1
            ? '1 task remaining'
            : `${remaining} tasks remaining`;

        todoStats.style.display = tasks.length > 0 ? 'flex' : 'none';
    }

    // ---- Add a new task ----
    function addTask() {
        const text = todoInput.value.trim();

        // Validation
        if (text === '') {
            todoInputErr.textContent = 'Please type a task before adding.';
            todoInput.classList.add('input-shake');
            todoInput.focus();
            setTimeout(() => todoInput.classList.remove('input-shake'), 400);
            return;
        }
        if (text.length < 2) {
            todoInputErr.textContent = 'Task must be at least 2 characters long.';
            todoInput.focus();
            return;
        }

        // Clear any inline error
        todoInputErr.textContent = '';

        const newTask = {
            id:        generateId(),
            text:      text,
            priority:  todoPriority.value,
            completed: false,
            createdAt: Date.now()
        };

        tasks.unshift(newTask); // Newest at top
        saveTasks();
        renderTasks();

        // Reset inputs
        todoInput.value = '';
        todoPriority.value = 'medium';
        todoInput.focus();
    }

    // ---- Toggle a task between complete and active ----
    function toggleComplete(id) {
        tasks = tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        saveTasks();
        renderTasks();
    }

    // ---- Delete a single task (with slide-out animation) ----
    function deleteTask(id, liElement) {
        liElement.classList.add('removing');
        liElement.addEventListener('animationend', () => {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
            renderTasks();
        }, { once: true 
    }

    // ---- Remove all completed tasks ----
    function clearCompleted() {
        const completedEls = todoList.querySelectorAll('.todo-item.completed');

        if (completedEls.length === 0) return;

        let doneCount = 0;
        completedEls.forEach(el => {
            el.classList.add('removing');
            el.addEventListener('animationend', () => {
                doneCount++;
                if (doneCount === completedEls.length) {
                    tasks = tasks.filter(t => !t.completed);
                    saveTasks();
                    renderTasks();
                }
            }, { once: true 
        
    }

    // ---- Event Listeners ----

    // Add button click
    todoAddBtn.addEventListener('click', addTask);

    // Enter key submits the task
    todoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask();
    

    // Clear error as user types
    todoInput.addEventListener('input', () => {
        if (todoInputErr.textContent) todoInputErr.textContent = '';
    

    // Filter tab buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            currentFilter = btn.dataset.filter;
            renderTasks();
        
    

    // Clear completed button
    todoClearBtn.addEventListener('click', clearCompleted);

    // ---- Initial Render ----
    // Seed demo tasks on very first visit so the list isn't empty
    if (tasks.length === 0) {
        tasks = [
            { id: generateId(), text: 'Complete ApexPlanet Task 2 ✅',      priority: 'high',   completed: true,  createdAt: Date.now() - 4000 },
            { id: generateId(), text: 'Build the contact form with JS validation', priority: 'high',   completed: true,  createdAt: Date.now() - 3000 },
            { id: generateId(), text: 'Study Flexbox & CSS Grid layouts',    priority: 'medium', completed: false, createdAt: Date.now() - 2000 },
            { id: generateId(), text: 'Practice JavaScript DOM manipulation', priority: 'medium', completed: false, createdAt: Date.now() - 1000 },
            { id: generateId(), text: 'Push project to GitHub',              priority: 'low',    completed: false, createdAt: Date.now()         },
        ];
        saveTasks();
    }

    renderTasks();

 // end DOMContentLoaded

    // ==========================================================================
    

    // ==========================================================================
    // 10. INTERACTIVE QUIZ — JavaScript Logic  [Task 3]
    // ==========================================================================
    const quizData = [
        {
            question: `"Machine Learning" is a subset of which broader field?`,
            options: ["Data Mining", "Artificial Intelligence", "Deep Learning", "Statistics"],
            correct: 1
        },
        {
            question: `Which Python library is the industry standard for Data Manipulation and Analysis?`,
            options: ["TensorFlow", "Matplotlib", "Pandas", "PyTorch"],
            correct: 2
        },
        {
            question: `In supervised learning, what does the model require during training?`,
            options: ["Labeled data", "Unlabeled data", "A reward function", "No data"],
            correct: 0
        },
        {
            question: `What does NLP stand for in Artificial Intelligence?`,
            options: ["Natural Learning Process", "Neural Language Programming", "Natural Language Processing", "Node Level Performance"],
            correct: 2
        },
        {
            question: `Which of these is NOT a neural network architecture?`,
            options: ["CNN (Convolutional Neural Network)", "RNN (Recurrent Neural Network)", "GAN (Generative Adversarial Network)", "SVM (Support Vector Machine)"],
            correct: 3
        },
        {
            question: `What is the purpose of an "Activation Function" in a neural network?`,
            options: ["To load data into memory", "To introduce non-linearity", "To calculate the loss", "To update the weights"],
            correct: 1
        },
        {
            question: `Which metric is best for evaluating a classification model on highly imbalanced data?`,
            options: ["Accuracy", "F1 Score", "Mean Squared Error", "R-Squared"],
            correct: 1
        }
    ];

    const quizStartScreen = document.getElementById('quiz-start-screen');
    const quizQuestionScreen = document.getElementById('quiz-question-screen');
    const quizResultsScreen = document.getElementById('quiz-results-screen');
    
    const startBtn = document.getElementById('quiz-start-btn');
    const nextBtn = document.getElementById('quiz-next-btn');
    const restartBtn = document.getElementById('quiz-restart-btn');
    
    const questionText = document.getElementById('quiz-question-text');
    const optionsContainer = document.getElementById('quiz-options');
    const counterDisplay = document.getElementById('quiz-counter');
    const liveScoreDisplay = document.getElementById('quiz-score-live');
    const progressFill = document.getElementById('quiz-progress-fill');
    const feedbackBox = document.getElementById('quiz-feedback');
    
    const resultsScore = document.getElementById('quiz-results-score');
    const resultsGrade = document.getElementById('quiz-results-grade');
    const resultsIcon = document.getElementById('quiz-results-icon');
    const resultsSummary = document.getElementById('quiz-summary');

    if (startBtn) {
        let currentQuestionIndex = 0;
        let score = 0;
        let userAnswers = [];

        function showScreen(screen) {
            quizStartScreen.style.display = 'none';
            quizQuestionScreen.style.display = 'none';
            quizResultsScreen.style.display = 'none';
            screen.style.display = 'flex';
        }

        function initQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = [];
            liveScoreDisplay.textContent = 'Score: 0';
            showScreen(quizQuestionScreen);
            loadQuestion();
        }

        function loadQuestion() {
            feedbackBox.style.display = 'none';
            feedbackBox.className = 'quiz-feedback';
            nextBtn.style.display = 'none';
            optionsContainer.innerHTML = '';
            
            const currentQ = quizData[currentQuestionIndex];
            
            counterDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
            const progressPercent = (currentQuestionIndex / quizData.length) * 100;
            progressFill.style.width = `${progressPercent}%`;

            questionText.textContent = currentQ.question;

            currentQ.options.forEach((opt, index) => {
                const btn = document.createElement('button');
                btn.classList.add('quiz-option-btn');
                btn.textContent = opt;
                btn.onclick = () => selectAnswer(index, btn);
                optionsContainer.appendChild(btn);
            });
        }

        function selectAnswer(selectedIndex, selectedBtn) {
            const currentQ = quizData[currentQuestionIndex];
            const isCorrect = (selectedIndex === currentQ.correct);
            
            userAnswers.push({
                qNum: currentQuestionIndex + 1,
                correct: isCorrect,
                text: currentQ.question
            });

            const allBtns = optionsContainer.querySelectorAll('.quiz-option-btn');
            allBtns.forEach(b => b.disabled = true);

            feedbackBox.style.display = 'block';
            if (isCorrect) {
                score++;
                liveScoreDisplay.textContent = `Score: ${score}`;
                selectedBtn.classList.add('correct');
                feedbackBox.textContent = 'Correct! Well done.';
                feedbackBox.classList.add('feedback-correct');
            } else {
                selectedBtn.classList.add('wrong');
                allBtns[currentQ.correct].classList.add('correct');
                feedbackBox.textContent = 'Incorrect.';
                feedbackBox.classList.add('feedback-wrong');
            }

            nextBtn.style.display = 'inline-block';
            
            if (currentQuestionIndex === quizData.length - 1) {
                nextBtn.innerHTML = 'Finish <i class="fa-solid fa-flag-checkered"></i>';
            } else {
                nextBtn.innerHTML = 'Next <i class="fa-solid fa-arrow-right"></i>';
            }
        }

        function showResults() {
            showScreen(quizResultsScreen);
            progressFill.style.width = '100%';
            resultsScore.textContent = `You scored ${score} / ${quizData.length}`;
            
            const percentage = score / quizData.length;
            
            if (percentage === 1) {
                resultsIcon.innerHTML = '<i class="fa-solid fa-trophy" style="color: #fbbf24;"></i>';
                resultsGrade.textContent = "Perfect! You're an AI master.";
            } else if (percentage >= 0.7) {
                resultsIcon.innerHTML = '<i class="fa-solid fa-medal" style="color: #94a3b8;"></i>';
                resultsGrade.textContent = "Great job! Strong foundation.";
            } else if (percentage >= 0.4) {
                resultsIcon.innerHTML = '<i class="fa-solid fa-thumbs-up" style="color: #60a5fa;"></i>';
                resultsGrade.textContent = "Good effort! A little more study needed.";
            } else {
                resultsIcon.innerHTML = '<i class="fa-solid fa-book-open" style="color: #f472b6;"></i>';
                resultsGrade.textContent = "Keep learning! AI is a huge field.";
            }

            resultsSummary.innerHTML = '';
            userAnswers.forEach(ans => {
                const item = document.createElement('div');
                item.className = `quiz-summary-item ${ans.correct ? 's-correct' : 's-wrong'}`;
                
                const icon = ans.correct 
                    ? '<i class="fa-solid fa-check"></i>' 
                    : '<i class="fa-solid fa-xmark"></i>';
                    
                item.innerHTML = `${icon} Q${ans.qNum}: ${ans.text}`;
                resultsSummary.appendChild(item);
            });
        }

        startBtn.addEventListener('click', initQuiz);
        restartBtn.addEventListener('click', initQuiz);
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });
    }

    // ==========================================================================
    // 11. LIVE API FEEDS (fetch)  [Task 3]
    // ==========================================================================

    async function fetchApiData(url, dom) {
        const loader = document.getElementById(dom.loaderId);
        dom.elementsToHide.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        if (loader) loader.style.display = 'flex';

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            
            if (loader) loader.style.display = 'none';
            dom.onSuccess(data);

        } catch (error) {
            console.error('API Fetch Error:', error);
            if (loader) loader.style.display = 'none';
            
            const fallbackEl = document.getElementById(dom.elementsToHide[0]);
            if (fallbackEl) {
                fallbackEl.textContent = "Failed to load data. Please try again.";
                fallbackEl.className = 'api-text api-error';
                fallbackEl.style.display = 'block';
            }
        }
    }


    // --- JOKE API (v2.jokeapi.dev) ---
    const jokeBtn = document.getElementById('joke-refresh-btn');
    if (jokeBtn) {
        const loadJoke = () => {
            const icon = jokeBtn.querySelector('i');
            icon.classList.add('spinning');
            jokeBtn.disabled = true;

            fetchApiData('https://v2.jokeapi.dev/joke/Programming?safe-mode', {
                loaderId: 'joke-loader',
                elementsToHide: ['joke-text', 'joke-punchline'],
                onSuccess: (data) => {
                    const txtEl = document.getElementById('joke-text');
                    const punchEl = document.getElementById('joke-punchline');
                    
                    txtEl.className = 'api-text';
                    
                    if (data.type === 'single') {
                        txtEl.textContent = data.joke;
                        txtEl.style.display = 'block';
                    } else if (data.type === 'twopart') {
                        txtEl.textContent = data.setup;
                        punchEl.textContent = data.delivery;
                        txtEl.style.display = 'block';
                        punchEl.style.display = 'block';
                    }

                    icon.classList.remove('spinning');
                    jokeBtn.disabled = false;
                }
            });
        };

        jokeBtn.addEventListener('click', loadJoke);
        loadJoke();
    }


    // --- TRIVIA API (Open Trivia DB) ---
    const triviaBtn = document.getElementById('trivia-refresh-btn');
    if (triviaBtn) {
        const loadTrivia = () => {
            const icon = triviaBtn.querySelector('i');
            icon.classList.add('spinning');
            triviaBtn.disabled = true;

            fetchApiData('https://opentdb.com/api.php?amount=1&category=18&type=boolean', {
                loaderId: 'trivia-loader',
                elementsToHide: ['trivia-question', 'trivia-answer-wrap'],
                onSuccess: (data) => {
                    if (data.results && data.results.length > 0) {
                        const questionData = data.results[0];
                        const qEl = document.getElementById('trivia-question');
                        const wrapEl = document.getElementById('trivia-answer-wrap');
                        const revealBtn = document.getElementById('trivia-reveal-btn');
                        const ansEl = document.getElementById('trivia-answer');

                        qEl.className = 'api-text';
                        ansEl.style.display = 'none';
                        revealBtn.style.display = 'inline-block';
                        
                        const decodeDiv = document.createElement('div');
                        decodeDiv.innerHTML = questionData.question;
                        qEl.textContent = `True or False: ${decodeDiv.textContent}`;
                        
                        ansEl.textContent = questionData.correct_answer;

                        const newReveal = revealBtn.cloneNode(true);
                        revealBtn.parentNode.replaceChild(newReveal, revealBtn);
                        
                        newReveal.addEventListener('click', () => {
                            newReveal.style.display = 'none';
                            ansEl.style.display = 'inline-block';
                        });

                        qEl.style.display = 'block';
                        wrapEl.style.display = 'flex';
                    }

                    icon.classList.remove('spinning');
                    triviaBtn.disabled = false;
                }
            });
        };

        triviaBtn.addEventListener('click', loadTrivia);
        setTimeout(loadTrivia, 600);
    }


    // --- ADVICE SLIP API ---
    const adviceBtn = document.getElementById('advice-refresh-btn');
    if (adviceBtn) {
        const loadAdvice = () => {
            const icon = adviceBtn.querySelector('i');
            icon.classList.add('spinning');
            adviceBtn.disabled = true;

            fetchApiData('https://api.adviceslip.com/advice', {
                loaderId: 'advice-loader',
                elementsToHide: ['advice-text'],
                onSuccess: (data) => {
                    const txtEl = document.getElementById('advice-text');
                    txtEl.className = 'api-text api-quote'; 
                    txtEl.textContent = `"${data.slip.advice}"`;
                    txtEl.style.display = 'block';

                    icon.classList.remove('spinning');
                    adviceBtn.disabled = false;
                }
            });
        };

        adviceBtn.addEventListener('click', loadAdvice);
        setTimeout(loadAdvice, 300);
    }
}); // End DOMContentLoaded

