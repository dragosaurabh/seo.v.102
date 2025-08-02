document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Preloader
    setTimeout(function() {
        document.querySelector('.page-loader').style.opacity = '0';
        document.querySelector('.page-loader').style.visibility = 'hidden';
    }, 1500);

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        delay: 50,
        disable: 'mobile'
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');

    if (cursor && cursorOutline) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            
            const posX = e.clientX;
            const posY = e.clientY;

            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;

            // Use GSAP for smooth cursor following
            gsap.to(cursorOutline, {
                left: posX,
                top: posY,
                duration: 0.15
            });
        });

        document.addEventListener('mouseout', function() {
            cursor.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });

        // Cursor effects on hover
        const links = document.querySelectorAll('a, button, .service-card, .case-study');
        links.forEach(link => {
            link.addEventListener('mouseover', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'var(--accent-color)';
            });
            
            link.addEventListener('mouseout', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'var(--primary-color)';
            });
        });
    }

    // Sticky header
    const header = document.getElementById('header');
    const scrollWatcher = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', scrollWatcher);
    scrollWatcher(); // Check initial state
    
    // Mobile Menu Functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileNav.classList.toggle('open');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    if (mobileMenu && mobileNav && mobileOverlay) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
        mobileOverlay.addEventListener('click', toggleMobileMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMobileMenu();
                
                // Update active state
                mobileNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Close mobile menu on resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991 && mobileNav.classList.contains('open')) {
            toggleMobileMenu();
        }
    });

    // Prevent body scroll when mobile menu is open
    document.body.style.cssText = `
        --window-scrollbar-width: ${window.innerWidth - document.documentElement.clientWidth}px;
    `;
    
    // Initialize Smooth Scrollbar
    if (typeof Scrollbar !== 'undefined') {
        Scrollbar.init(document.querySelector('#smooth-scroll'), {
            damping: 0.1,
            thumbMinSize: 20
        });
    }

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#4353FF"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4353FF",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // CTA particles
    if (typeof particlesJS !== 'undefined' && document.getElementById('cta-particles')) {
        particlesJS('cta-particles', {
            "particles": {
                "number": {
                    "value": 40,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true
                },
                "size": {
                    "value": 4,
                    "random": true
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                }
            },
            "retina_detect": true
        });
    }

    // Number counter animation
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Start counting when counters are in viewport
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateValue(counter, 0, target, 2000);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.3 });

    const counters = document.querySelectorAll('.stat-number, .counter');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Testimonial slider functionality
    function initTestimonialSlider() {
        const slider = document.querySelector('.testimonials-track');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (!slider || !prevBtn || !nextBtn) return;
        
        let isDown = false;
        let startX;
        let scrollLeft;
        let currentIndex = 0;
        const cards = slider.querySelectorAll('.testimonial-card');
        const cardWidth = cards[0].offsetWidth + 30; // Including gap
        
        // Mouse events for drag scrolling
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Navigation buttons
        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(currentIndex + 1, cards.length - 1);
            scrollToCard(currentIndex);
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            scrollToCard(currentIndex);
        });
        
        function scrollToCard(index) {
            gsap.to(slider, {
                scrollLeft: index * cardWidth,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Update button states
            prevBtn.style.opacity = index === 0 ? '0.5' : '1';
            nextBtn.style.opacity = index === cards.length - 1 ? '0.5' : '1';
        }
        
        // Initialize
        slider.style.cursor = 'grab';
        prevBtn.style.opacity = '0.5'; // Initially disable prev button
    }

    // Initialize testimonial slider when DOM is loaded
    initTestimonialSlider();
    
    // Form submission with validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const fields = [name, email, message];
            
            fields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#FF6584';
                    
                    // Create error message if it doesn't exist
                    let errorMsg = field.parentElement.querySelector('.error-msg');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-msg';
                        errorMsg.style.color = '#FF6584';
                        errorMsg.style.fontSize = '12px';
                        errorMsg.style.marginTop = '5px';
                        field.parentElement.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'This field is required';
                    
                    // Add shake animation
                    gsap.to(field, {
                        x: [-5, 5, -5, 5, 0],
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                } else {
                    field.style.borderColor = '';
                    
                    // Remove error message if it exists
                    const errorMsg = field.parentElement.querySelector('.error-msg');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            // Email validation
            if (email.value.trim() && !/\S+@\S+\.\S+/.test(email.value)) {
                isValid = false;
                email.style.borderColor = '#FF6584';
                
                // Create error message if it doesn't exist
                let errorMsg = email.parentElement.querySelector('.error-msg');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-msg';
                    errorMsg.style.color = '#FF6584';
                    errorMsg.style.fontSize = '12px';
                    errorMsg.style.marginTop = '5px';
                    email.parentElement.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Please enter a valid email address';
                
                // Add shake animation
                gsap.to(email, {
                    x: [-5, 5, -5, 5, 0],
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            }
            
            if (!isValid) return;
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form with animation
                fields.forEach(field => {
                    gsap.to(field, {
                        value: '',
                        duration: 0.3
                    });
                });
                
                // Show success message
                const successEl = document.createElement('div');
                successEl.className = 'form-success';
                successEl.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message. We will get back to you shortly!';
                successEl.style.backgroundColor = 'rgba(67, 83, 255, 0.1)';
                successEl.style.color = 'var(--primary-color)';
                successEl.style.padding = '15px';
                successEl.style.borderRadius = '10px';
                successEl.style.marginTop = '20px';
                successEl.style.textAlign = 'center';
                successEl.style.fontWeight = '500';
                
                contactForm.appendChild(successEl);
                
                gsap.fromTo(successEl, {
                    opacity: 0,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                });
                
                // Reset button
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    gsap.to(successEl, {
                        opacity: 0,
                        y: -20,
                        duration: 0.5,
                        onComplete: function() {
                            successEl.remove();
                        }
                    });
                }, 5000);
            }, 2000);
        });
        
        // Remove error state on input
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
                const errorMsg = this.parentElement.querySelector('.error-msg');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
            
            input.addEventListener('blur', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '';
                }
            });
        });
    }
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                gsap.to(scrollTopBtn, {
                    opacity: 1,
                    visibility: 'visible',
                    y: 0,
                    duration: 0.3
                });
            } else {
                gsap.to(scrollTopBtn, {
                    opacity: 0,
                    visibility: 'hidden',
                    y: 20,
                    duration: 0.3
                });
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Text typing animation with GSAP
    if (typeof gsap !== 'undefined' && typeof gsap.to !== 'undefined') {
        const textElements = document.querySelectorAll('.text-animation');
        textElements.forEach(el => {
            const text = el.textContent;
            el.textContent = '';
            
            gsap.to(el, {
                duration: 2.5,
                text: { value: text, delimiter: '' },
                ease: "power3.inOut",
                delay: 1
            });
        });
        
        // Enhanced floating elements animation
        gsap.to('.floating-element', {
            y: -20,
            duration: 2,
            rotation: 10,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.3
        });
        
        // Scroll animation for about section
        if (document.querySelector('.about-image')) {
            ScrollTrigger.create({
                trigger: '.about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                onUpdate: self => {
                    gsap.to('.about-image', {
                        y: -30 * self.progress,
                        duration: 0.1
                    });
                }
            });
        }
    }
    
    // GSAP Scrolling Animations
    if (typeof ScrollTrigger !== 'undefined') {
        // Hero section animations
        const heroTl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
                duration: 0.8
            }
        });

        heroTl
            .fromTo('.hero-badge', 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0 }
            )
            .fromTo('.hero-title', 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0 },
                '-=0.6'
            )
            .fromTo('.hero-description', 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0 },
                '-=0.6'
            )
            .fromTo('.hero-buttons', 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0 },
                '-=0.6'
            )
            .fromTo('.hero .stat', 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0,
                    stagger: 0.2
                },
                '-=0.4'
            )
            .fromTo('.hero-image', 
                { opacity: 0, scale: 0.9, y: 30 },
                { 
                    opacity: 1, 
                    scale: 1,
                    y: 0,
                    duration: 1
                },
                '-=0.8'
            );

        // Add floating animation to hero image
        gsap.to('.hero-image', {
            y: -20,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        // Section headers reveal
        gsap.utils.toArray('.section-header').forEach(header => {
            ScrollTrigger.create({
                trigger: header,
                start: "top 80%",
                onEnter: () => {
                    gsap.fromTo(header, 
                        { opacity: 0, y: 50 },
                        { opacity: 1, y: 0, duration: 0.8 }
                    );
                },
                once: true
            });
        });
        
        // Service cards staggered animation
        const serviceCards = gsap.utils.toArray('.service-card');
        ScrollTrigger.create({
            trigger: '.services-grid',
            start: "top 75%",
            onEnter: () => {
                gsap.fromTo(serviceCards, 
                    { opacity: 0, y: 50 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.6, 
                        stagger: 0.1
                    }
                );
            },
            once: true
        });
        
        // Case study cards animation
        const caseStudies = gsap.utils.toArray('.case-study');
        ScrollTrigger.create({
            trigger: '.case-studies-grid',
            start: "top 75%",
            onEnter: () => {
                gsap.fromTo(caseStudies, 
                    { opacity: 0, y: 50 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.6, 
                        stagger: 0.2
                    }
                );
            },
            once: true
        });
        
        // About section image animation
        ScrollTrigger.create({
            trigger: '.about-image',
            start: "top 75%",
            onEnter: () => {
                gsap.fromTo('.about-image', 
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.8 }
                );
            },
            once: true
        });
        
        // Contact form animation
        if (document.querySelector('.contact-form-wrapper')) {
            ScrollTrigger.create({
                trigger: '.contact-form-wrapper',
                start: "top 75%",
                onEnter: () => {
                    gsap.fromTo('.contact-form-container', 
                        { opacity: 0, y: 50 },
                        { opacity: 1, y: 0, duration: 0.8 }
                    );
                },
                once: true
            });
        }
    }
    
    // Google Map initialization
    function initMap() {
        if (document.getElementById('map')) {
            const location = { lat: 37.7749, lng: -122.4194 }; // San Francisco
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: location,
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "weight": "2.00"
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#9c9c9c"
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#f8faff"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 45
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#4353ff"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#e0edff"
                            }
                        ]
                    }
                ]
            });
            
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: '#4353FF',
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2,
                }
            });
        }
    }
    
    // Initialize map if exists
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        initMap();
    } else {
        window.initMap = initMap;
    }

    // SEO Analytics Dashboard Animation
    const analyticsDashboard = document.querySelector('.analytics-dashboard');
    if (analyticsDashboard) {
        // Add mousemove 3D effect
        analyticsDashboard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 10; // -10 to 10 degrees
            const rotateX = ((centerY - y) / centerY) * 10; // -10 to 10 degrees
            
            // Apply rotation
            this.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        // Reset rotation when mouse leaves
        analyticsDashboard.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(10deg) rotateX(5deg)';
        });
        
        // Animated chart bars
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            // Set increasing delay for each bar
            bar.style.animationDelay = `${index * 0.2}s`;
            
            // Add hover effect
            bar.addEventListener('mouseover', function() {
                this.style.opacity = '1';
                this.style.transform = 'scaleY(1.05)';
            });
            
            bar.addEventListener('mouseout', function() {
                if (!this.classList.contains('active')) {
                    this.style.opacity = '0.7';
                }
                this.style.transform = 'scaleY(1)';
            });
        });
        
        // Metrics animation
        const metrics = document.querySelectorAll('.metric');
        metrics.forEach((metric, index) => {
            metric.style.animationDelay = `${index * 0.3}s`;
            gsap.from(metric, {
                opacity: 0,
                y: 20,
                delay: 1 + (index * 0.3),
                duration: 0.8,
                ease: "power2.out"
            });
        });
        
        // Animate metric numbers
        const metricValues = document.querySelectorAll('.metric-value');
        metricValues.forEach(value => {
            const finalValue = value.textContent;
            const isPercentage = finalValue.includes('%');
            const numericValue = parseInt(finalValue.replace('%', ''));
            
            value.textContent = '0' + (isPercentage ? '%' : '');
            
            // Animate to final value
            let current = 0;
            const interval = setInterval(() => {
                current += Math.ceil(numericValue / 30);
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(interval);
                }
                value.textContent = current + (isPercentage ? '%' : '');
            }, 50);
        });
    }

    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.floating-element, .floating-shape, .dot-group-1, .dot-group-2');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingElements.forEach(element => {
            const speed = element.classList.contains('floating-element') ? 30 : 
                         element.classList.contains('floating-shape') ? 20 : 15;
            
            const moveX = (mouseX - 0.5) * speed;
            const moveY = (mouseY - 0.5) * speed;

            gsap.to(element, {
                x: moveX,
                y: moveY,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });

    // Enhanced floating animation for elements
    floatingElements.forEach((element, index) => {
        const timeline = gsap.timeline({
            repeat: -1,
            defaults: { duration: 3, ease: 'power1.inOut' }
        });

        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const randomRotation = Math.random() * 10 - 5;
        const delay = index * 0.2;

        timeline
            .to(element, {
                y: randomY,
                x: randomX,
                rotation: randomRotation,
                delay: delay
            })
            .to(element, {
                y: -randomY,
                x: -randomX,
                rotation: -randomRotation
            })
            .to(element, {
                y: 0,
                x: 0,
                rotation: 0
            });
    });
}); 