// Additional Interactive Features for Portfolio

// Intersection Observer for scroll animations
const observeElements = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.service-card, .portfolio-item, .contact-method').forEach(el => {
        observer.observe(el);
    });
};

// Typing effect for hero section
const createTypingEffect = () => {
    const texts = [
        'פתרונות פיתוח מתקדמים',
        'אתרים רספונסיביים', 
        'אפליקציות מותאמות אישית',
        'חוויות דיגיטליות מרשימות'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typingElement = document.querySelector('.text-cycle');
    if (!typingElement) return;
    
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? deleteSpeed : typeSpeed;
        
        if (!isDeleting && charIndex === currentText.length) {
            speed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, speed);
    }
    
    type();
};

// Smooth scrolling with offset for fixed header
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Parallax effect for hero section
const initParallaxEffect = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = hero.querySelectorAll('.tech-item');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.2);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
};

// Loading animation
const initLoadingAnimation = () => {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate elements on load
        const animateOnLoad = [
            '.hero-text h1',
            '.hero-text h2', 
            '.hero-text p',
            '.hero-buttons',
            '.profile-card'
        ];
        
        animateOnLoad.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.classList.add('slide-up');
                }, index * 200);
            }
        });
    });
};

// Interactive portfolio filtering with animation
// DISABLED: React handles portfolio filtering via useState
// This vanilla JS version was conflicting with React's state management
const enhancePortfolioFiltering = () => {
    // React now manages portfolio filtering - see Portfolio component in app.js
    // Keeping this function empty to avoid breaking any external calls
    return;
};

// Form validation and submission
const enhanceContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    // Add floating labels effect
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const formData = new FormData(form);
        
        // Validate required fields
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                setTimeout(() => input.classList.remove('error'), 3000);
            } else {
                input.classList.remove('error');
            }
        });
        
        // Validate email
        const email = form.querySelector('input[type="email"]');
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                isValid = false;
                email.classList.add('error');
            }
        }
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> שולח...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="bx bx-check"></i> נשלח בהצלחה!';
                submitBtn.style.background = 'var(--accent-color)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 2000);
        }
    });
};

// Stats counter animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target > 50) {
                element.textContent = Math.floor(current) + '+';
            } else if (target === 100) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 50);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                countUp(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
};

// Mobile menu enhancement
const enhanceMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !navMenu) return;
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
};

// Theme switcher (optional feature)
const initThemeSwitcher = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Create theme toggle button (if you want to add one later)
    const createThemeToggle = () => {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
        toggle.setAttribute('aria-label', 'Toggle theme');
        
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            toggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
        });
        
        return toggle;
    };
};

// Preloader
const initPreloader = () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="loader">
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
            </div>
            <p>טוען...</p>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
};

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core features
    observeElements();
    initSmoothScrolling();
    enhanceMobileMenu();
    
    // Enhanced features
    setTimeout(() => {
        createTypingEffect();
        initParallaxEffect();
        enhancePortfolioFiltering();
        enhanceContactForm();
        animateStats();
        initThemeSwitcher();
    }, 500);
});

// Initialize loading features
initLoadingAnimation();
initPreloader();

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize scroll events
let ticking = false;
const handleScroll = () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', handleScroll);

// Export functions for external use if needed
window.PortfolioInteractions = {
    observeElements,
    createTypingEffect,
    initSmoothScrolling,
    enhancePortfolioFiltering,
    enhanceContactForm,
    animateStats
};