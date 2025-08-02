document.addEventListener('DOMContentLoaded', function() {
    // Typewriter Effect
    if (document.getElementById('type-text')) {
        const typeText = document.getElementById('type-text');
        const careers = ['Technology', 'Design', 'Business', 'Healthcare', 'Science', 'Arts'];
        let i = 0;
        
        function typeWriter() {
            typeText.textContent = careers[i];
            i = (i + 1) % careers.length;
            setTimeout(typeWriter, 2000);
        }
        
        typeWriter();
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Live Job Market Data Simulation
    function updateJobMarketData() {
        if (document.getElementById('openPositions')) {
            document.getElementById('openPositions').textContent = 
                `${Math.floor(5000 + Math.random() * 1000)}+`;
            
            document.getElementById('avgSalary').textContent = 
                `$${Math.floor(90000 + Math.random() * 5000).toLocaleString()}`;
            
            document.getElementById('growthRate').textContent = 
                `${Math.floor(20 + Math.random() * 5)}%`;
        }
    }
    
    // Update every 5 seconds
    setInterval(updateJobMarketData, 5000);
    updateJobMarketData();

    // Floating Button Visibility
    const floatingBtn = document.querySelector('.floating-btn');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            floatingBtn.classList.add('visible');
        } else {
            floatingBtn.classList.remove('visible');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Animation on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .stat-card, .forum-thread');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// Additional functions for other pages
function initializeCareerPage() {
    // Career cards toggle functionality
    document.querySelectorAll('.resources-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const card = this.closest('.career-card');
            const resources = card.querySelector('.resources-list');
            
            this.classList.toggle('active');
            resources.classList.toggle('active');
            
            const icon = this.querySelector('i');
            icon.style.transform = this.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });
}

function initializeQuizPage() {
    const quizQuestions = [
        {
            id: 1,
            text: "Which type of activities do you enjoy most?",
            options: [
                { text: "Solving complex problems", value: "analytical" },
                { text: "Creating visual designs", value: "creative" },
                { text: "Helping people directly", value: "social" },
                { text: "Organizing information", value: "structured" }
            ]
        },
        {
            id: 2,
            text: "What's your ideal work environment?",
            options: [
                { text: "Structured office setting", value: "office" },
                { text: "Flexible/remote work", value: "remote" },
                { text: "Fast-paced team environment", value: "team" },
                { text: "Independent/self-directed", value: "independent" }
            ]
        },
        {
            id: 3,
            text: "Which subjects interest you most?",
            options: [
                { text: "Math and logic", value: "math" },
                { text: "Arts and design", value: "arts" },
                { text: "Science and technology", value: "science" },
                { text: "Business and finance", value: "business" }
            ]
        }
    ];

    const careerResults = {
        analytical: "Software Developer or Data Scientist",
        creative: "UX Designer or Digital Artist",
        social: "Healthcare Professional or Teacher",
        structured: "Financial Analyst or Project Manager",
        office: "Corporate Executive or Administrator",
        remote: "Freelancer or Digital Nomad",
        team: "Marketing Specialist or Sales Manager",
        independent: "Researcher or Consultant",
        math: "Engineer or Statistician",
        arts: "Graphic Designer or Architect",
        science: "Biotechnologist or Environmental Scientist",
        business: "Entrepreneur or Business Analyst"
    };

    let currentQuestion = 0;
    let answers = {};
    const quizContainer = document.getElementById('quiz-container');

    function renderQuestion() {
        const question = quizQuestions[currentQuestion];
        const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
        
        quizContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress" style="width: ${progress}%"></div>
            </div>
            <div class="question-container">
                <div class="question-text">${question.text}</div>
                ${question.options.map((option, index) => `
                    <button class="option" data-value="${option.value}">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
            <div class="quiz-nav">
                ${currentQuestion > 0 ? `
                    <button class="btn btn-secondary" id="prev-btn">
                        <i class="fas fa-arrow-left"></i> Previous
                    </button>
                ` : '<div></div>'}
                <button class="btn btn-primary" id="next-btn">
                    ${currentQuestion < quizQuestions.length - 1 ? 'Next' : 'See Results'}
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        // Add event listeners
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                answers[question.id] = this.dataset.value;
            });
        });
        
        if (currentQuestion > 0) {
            document.getElementById('prev-btn').addEventListener('click', () => {
                currentQuestion--;
                renderQuestion();
            });
        }
        
        document.getElementById('next-btn').addEventListener('click', () => {
            if (!answers[question.id]) {
                alert('Please select an option before continuing');
                return;
            }
            
            if (currentQuestion < quizQuestions.length - 1) {
                currentQuestion++;
                renderQuestion();
            } else {
                showResults();
            }
        });
    }

    function showResults() {
        // Simple scoring - just use the last answer for demo purposes
        const lastAnswer = answers[quizQuestions[currentQuestion].id];
        const result = careerResults[lastAnswer] || "Career Counselor";
        
        // Confetti celebration
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6e45e2', '#07d0b5', '#ff7e5f']
            });
        }
        
        quizContainer.innerHTML = `
            <div class="result-container">
                <h2 class="result-title">🎉 Your Career Match</h2>
                <div class="result-career">${result}</div>
                <p class="result-description">
                    Based on your answers, careers in <strong>${result}</strong> 
                    would be a great fit for your skills and interests.
                </p>
                <div class="result-buttons">
                    <button class="btn btn-secondary" id="retake-btn">
                        <i class="fas fa-redo"></i> Retake Quiz
                    </button>
                    <a href="careers.html" class="btn btn-primary">
                        <i class="fas fa-briefcase"></i> Explore Careers
                    </a>
                </div>
            </div>
        `;
        
        document.getElementById('retake-btn').addEventListener('click', () => {
            currentQuestion = 0;
            answers = {};
            renderQuestion();
        });
    }

    if (quizContainer) {
        renderQuestion();
    }
}

// Initialize the appropriate page
if (document.querySelector('.careers-page')) {
    initializeCareerPage();
} else if (document.querySelector('.quiz-page')) {
    initializeQuizPage();
}
document.addEventListener('DOMContentLoaded', function() {
    // Common functionality for all pages
    initCommonFeatures();
    
    // Page-specific initialization
    if (document.body.classList.contains('careers-page')) {
        initCareersPage();
    } else if (document.body.classList.contains('quiz-page')) {
        initQuizPage();
    }
});

function initCommonFeatures() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a regular link
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Floating Button
    const floatingBtn = document.querySelector('.floating-btn');
    if (floatingBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                floatingBtn.classList.add('visible');
            } else {
                floatingBtn.classList.remove('visible');
            }
        });

        // Ensure the button works
        floatingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Typewriter Effect (for homepage)
    if (document.getElementById('type-text')) {
        const typeText = document.getElementById('type-text');
        const careers = ['Technology', 'Design', 'Business', 'Healthcare', 'Science', 'Arts'];
        let i = 0;
        
        function typeWriter() {
            typeText.textContent = careers[i];
            i = (i + 1) % careers.length;
            setTimeout(typeWriter, 2000);
        }
        
        typeWriter();
    }
}

function initCareersPage() {
    const careers = [
        {
            id: 1,
            title: "Software Developer",
            description: "Build applications and systems that power our digital world. Developers write, test, and maintain code for various platforms.",
            resources: [
                { name: "freeCodeCamp", type: "Free Course", url: "https://www.freecodecamp.org/" },
                { name: "The Odin Project", type: "Learning Path", url: "https://www.theodinproject.com/" }
            ]
        },
        {
            id: 2,
            title: "Data Scientist",
            description: "Extract insights from complex data to drive decision making. Use statistics, machine learning, and programming to analyze data.",
            resources: [
                { name: "Kaggle Learn", type: "Interactive Tutorials", url: "https://www.kaggle.com/learn" },
                { name: "Data Science Fundamentals", type: "IBM Course", url: "https://www.coursera.org/professional-certificates/ibm-data-science" }
            ]
        },
        {
            id: 3,
            title: "UX Designer",
            description: "Create intuitive and user-friendly digital experiences. Focus on user research, wireframing, and prototyping.",
            resources: [
                { name: "Google UX Design Course", type: "Coursera", url: "https://www.coursera.org/professional-certificates/google-ux-design" },
                { name: "Figma Tutorials", type: "Design Tool", url: "https://www.figma.com/resources/learn-design/" }
            ]
        }
    ];

    const container = document.getElementById('careersContainer');
    if (container) {
        container.innerHTML = careers.map(career => `
            <div class="career-card">
                <div class="card-content">
                    <h3>${career.title}</h3>
                    <p>${career.description}</p>
                    <div class="resources-toggle">
                        <span>Show resources</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="resources-list">
                        ${career.resources.map(resource => `
                            <div class="resource-item">
                                <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
                                    <i class="fas fa-external-link-alt"></i> ${resource.name}
                                </a>
                                <span class="resource-type">${resource.type}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Add toggle functionality
        document.querySelectorAll('.resources-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const card = this.closest('.career-card');
                const resources = card.querySelector('.resources-list');
                const icon = this.querySelector('i');
                
                resources.classList.toggle('active');
                icon.style.transform = resources.classList.contains('active') ? 
                    'rotate(180deg)' : 'rotate(0)';
                
                const text = this.querySelector('span');
                text.textContent = resources.classList.contains('active') ? 
                    'Hide resources' : 'Show resources';
            });
        });
    }
}

function initQuizPage() {
    const quizQuestions = [
        {
            id: 1,
            text: "Which type of activities do you enjoy most?",
            options: [
                { text: "Solving complex problems", value: "analytical" },
                { text: "Creating visual designs", value: "creative" },
                { text: "Helping people directly", value: "social" },
                { text: "Organizing information", value: "structured" }
            ]
        },
        {
            id: 2,
            text: "What's your ideal work environment?",
            options: [
                { text: "Structured office setting", value: "office" },
                { text: "Flexible/remote work", value: "remote" },
                { text: "Fast-paced team environment", value: "team" },
                { text: "Independent/self-directed", value: "independent" }
            ]
        },
        {
            id: 3,
            text: "Which subjects interest you most?",
            options: [
                { text: "Math and logic", value: "math" },
                { text: "Arts and design", value: "arts" },
                { text: "Science and technology", value: "science" },
                { text: "Business and finance", value: "business" }
            ]
        }
    ];

    const careerResults = {
        analytical: "Software Developer or Data Scientist",
        creative: "UX Designer or Digital Artist",
        social: "Healthcare Professional or Teacher",
        structured: "Financial Analyst or Project Manager",
        office: "Corporate Executive or Administrator",
        remote: "Freelancer or Digital Nomad",
        team: "Marketing Specialist or Sales Manager",
        independent: "Researcher or Consultant",
        math: "Engineer or Statistician",
        arts: "Graphic Designer or Architect",
        science: "Biotechnologist or Environmental Scientist",
        business: "Entrepreneur or Business Analyst"
    };

    let currentQuestion = 0;
    let answers = {};
    const quizContainer = document.getElementById('quizContainer');

    function renderQuestion() {
        const question = quizQuestions[currentQuestion];
        const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
        
        quizContainer.innerHTML = `
            <div class="quiz-header">
                <h2>Career Quiz</h2>
                <div class="progress-bar">
                    <div class="progress" style="width: ${progress}%"></div>
                </div>
                <div class="question-count">Question ${currentQuestion + 1} of ${quizQuestions.length}</div>
            </div>
            <div class="question-container">
                <div class="question-text">${question.text}</div>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <button class="option" data-value="${option.value}">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div class="quiz-navigation">
                ${currentQuestion > 0 ? `
                    <button class="btn btn-secondary" id="prevBtn">
                        <i class="fas fa-arrow-left"></i> Previous
                    </button>
                ` : '<div></div>'}
                <button class="btn btn-primary" id="nextBtn">
                    ${currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        // Add event listeners
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                answers[question.id] = this.dataset.value;
            });
        });
        
        if (currentQuestion > 0) {
            document.getElementById('prevBtn').addEventListener('click', () => {
                currentQuestion--;
                renderQuestion();
            });
        }
        
        document.getElementById('nextBtn').addEventListener('click', () => {
            if (!answers[question.id]) {
                alert('Please select an option before continuing');
                return;
            }
            
            if (currentQuestion < quizQuestions.length - 1) {
                currentQuestion++;
                renderQuestion();
            } else {
                showResults();
            }
        });
    }

    function showResults() {
        // Simple scoring - just use the last answer for demo purposes
        const lastAnswer = answers[quizQuestions[currentQuestion].id];
        const result = careerResults[lastAnswer] || "Career Counselor";
        
        // Confetti celebration
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6e45e2', '#07d0b5', '#ff7e5f']
            });
        }
        
        quizContainer.innerHTML = `
            <div class="result-container">
                <div class="result-header">
                    <h2>Your Career Match</h2>
                    <div class="emoji">🎉</div>
                </div>
                <div class="result-content">
                    <div class="result-career">${result}</div>
                    <p class="result-description">
                        Based on your answers, careers in <strong>${result}</strong> 
                        would be a great fit for your skills and interests.
                    </p>
                    <div class="result-actions">
                        <button class="btn btn-secondary" id="retakeBtn">
                            <i class="fas fa-redo"></i> Retake Quiz
                        </button>
                        <a href="careers.html" class="btn btn-primary">
                            <i class="fas fa-briefcase"></i> Explore Careers
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('retakeBtn').addEventListener('click', () => {
            currentQuestion = 0;
            answers = {};
            renderQuestion();
        });
    }

    if (quizContainer) {
        renderQuestion();
    }
}
// In your script.js
function renderCareerPath(steps) {
  const container = document.querySelector('.career-path');
  container.innerHTML = `
    <div class="path-line"></div>
    <div class="path-steps">
      ${steps.map((step, i) => `
        <div class="path-step" style="left: ${(i/(steps.length-1))*100}%">
          <div class="step-dot" style="background: ${step.color}"></div>
          <div class="step-info">
            <h4>${step.title}</h4>
            <p>${step.description}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Example usage:
renderCareerPath([
  { title: "Bachelor's Degree", description: "Computer Science", color: "#6e45e2" },
  { title: "Internship", description: "Frontend Development", color: "#07d0b5" },
  { title: "Junior Developer", description: "2-3 years experience", color: "#ff7e5f" },
  { title: "Senior Developer", description: "5+ years experience", color: "#9d65c9" },
  { title: "Tech Lead", description: "Team management", color: "#2cb67d" }
]);
// In your existing script.js
function initCareersPage() {
    const careers = [
        {
            id: 1,
            title: "Software Developer",
            description: "Build applications and systems that power our digital world.",
            resources: [
                { name: "freeCodeCamp", type: "Free Course", url: "https://www.freecodecamp.org/" },
                { name: "The Odin Project", type: "Learning Path", url: "https://www.theodinproject.com/" }
            ]
        },
        {
            id: 2,
            title: "Data Scientist",
            description: "Extract insights from complex data to drive decision making.",
            resources: [
                { name: "Kaggle Learn", type: "Interactive Tutorials", url: "https://www.kaggle.com/learn" },
                { name: "Data Science Fundamentals", type: "IBM Course", url: "https://www.coursera.org/professional-certificates/ibm-data-science" }
            ]
        },
        {
            id: 3,
            title: "UX Designer",
            description: "Create intuitive and user-friendly digital experiences.",
            resources: [
                { name: "Google UX Design Course", type: "Coursera", url: "https://www.coursera.org/professional-certificates/google-ux-design" },
                { name: "Figma Tutorials", type: "Design Tool", url: "https://www.figma.com/resources/learn-design/" }
            ]
        }
    ];

    const container = document.getElementById('careersContainer');
    if (container) {
        container.innerHTML = careers.map(career => `
            <div class="career-card">
                <div class="card-content">
                    <h3>${career.title}</h3>
                    <p>${career.description}</p>
                    <div class="resources-toggle">
                        <span>Show resources</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="resources-list">
                        ${career.resources.map(resource => `
                            <div class="resource-item">
                                <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
                                    <i class="fas fa-external-link-alt"></i> ${resource.name}
                                </a>
                                <span class="resource-type">${resource.type}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Add toggle functionality
        document.querySelectorAll('.resources-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const card = this.closest('.career-card');
                const resources = card.querySelector('.resources-list');
                const icon = this.querySelector('i');
                
                resources.classList.toggle('active');
                icon.style.transform = resources.classList.contains('active') ? 
                    'rotate(180deg)' : 'rotate(0)';
                
                const text = this.querySelector('span');
                text.textContent = resources.classList.contains('active') ? 
                    'Hide resources' : 'Show resources';
            });
        });
    }

    // Animate steps on scroll
    const steps = document.querySelectorAll('.step');
    function animateSteps() {
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(-50%)';
            }, index * 300);
        });
    }

    // Run animation when path is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateSteps();
        }
    }, { threshold: 0.5 });

    const pathContainer = document.querySelector('.path-container');
    if (pathContainer) observer.observe(pathContainer);
}
// Community Page Functionality
function initCommunityPage() {
    // New Post Modal
    const modal = document.getElementById('postModal');
    const newPostBtn = document.getElementById('newPostBtn');
    const closeModal = document.querySelector('.close-modal');
    
    if (newPostBtn) {
        newPostBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
//   Form Submission 
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Post submitted! (This would connect to a backend in production)');
            modal.style.display = 'none';
            postForm.reset();
        });
    }
}

// Initialize the correct page
if (document.body.classList.contains('community-page')) {
    initCommunityPage();
}