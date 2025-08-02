/* ===== MODERN WEBSITE FUNCTIONALITY ===== */

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initTestimonialSlider();
    initCounters();
    initCursor();
    initParticles();
});

// Page Loader
function initLoader() {
    const loader = $('.page-loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Navigation
function initNavigation() {
    const header = $('#header');
    const mobileMenu = $('.mobile-menu');
    const mobileNav = $('.mobile-nav');
    const mobileMenuClose = $('.mobile-menu-close');
    const navLinks = $$('.nav-link');
    const contactBtns = $$('.contact-btn');
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.backdropFilter = 'blur(16px)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
    });
    
    // Mobile menu toggle
    mobileMenu.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking outside
    mobileNav.addEventListener('click', (e) => {
        if (e.target === mobileNav) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = $(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Contact button functionality
    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = $('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = $$('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const scrollTopBtn = $('#scroll-top');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Reveal animations on scroll
    const revealElements = $$('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Stagger animation for service cards
    const staggerItems = $$('.stagger-item');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.2
    });
    
    staggerItems.forEach(item => {
        staggerObserver.observe(item);
    });
}

// Animations
function initAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
    
    // Text animation for hero
    const textAnimation = $('.text-animation');
    if (textAnimation) {
        const words = ['SEO', 'Growth', 'Traffic', 'Rankings'];
        let currentWord = 0;
        
        setInterval(() => {
            currentWord = (currentWord + 1) % words.length;
            textAnimation.textContent = words[currentWord];
        }, 3000);
    }
    
    // Floating elements animation
    const floatingElements = $$('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Contact Form
function initContactForm() {
    const contactForm = $('#contactForm');
    if (!contactForm) return;
    
    const formGroups = $$('.form-group');
    const inputs = $$('input, select, textarea');
    
    // Form validation
    function validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        const required = input.hasAttribute('required');
        const formGroup = input.closest('.form-group');
        
        let isValid = true;
        let errorMessage = '';
        
        if (required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Update form group state
        formGroup.classList.remove('error', 'success');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!isValid) {
            formGroup.classList.add('error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
        } else if (value) {
            formGroup.classList.add('success');
            if (errorElement) {
                errorElement.remove();
            }
        }
        
        return isValid;
    }
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateInput(input);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                formGroups.forEach(group => {
                    group.classList.remove('error', 'success');
                    const errorElement = group.querySelector('.error-message');
                    if (errorElement) errorElement.remove();
                });
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            showMessage('Please fix the errors in the form before submitting.', 'error');
        }
    });
    
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = $('.contact-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `contact-message ${type}`;
        messageElement.textContent = message;
        document.body.appendChild(messageElement);
        
        // Show message
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 100);
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const track = $('.testimonials-track');
    const prevBtn = $('.prev-btn');
    const nextBtn = $('.next-btn');
    const cards = $$('.testimonial-card');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // Including gap
    
    function updateSlider() {
        const translateX = -currentIndex * cardWidth;
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - 1;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Auto-slide
    setInterval(() => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }, 5000);
    
    // Initialize
    updateSlider();
    
    // Handle resize
    window.addEventListener('resize', () => {
        updateSlider();
    });
}

// Counter Animation
function initCounters() {
    const counters = $$('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Custom Cursor
function initCursor() {
    const cursorDot = $('.cursor-dot');
    const cursorOutline = $('.cursor-dot-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Smooth follow for outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateOutline);
    }
    
    animateOutline();
    
    // Cursor interactions
    const interactiveElements = $$('a, button, .service-card, .case-study, .testimonial-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Particles Background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                },
                opacity: {
                    value: 0.1,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.05,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.05,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 