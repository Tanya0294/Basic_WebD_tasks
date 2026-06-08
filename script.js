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
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // DOM Elements Cache
    // ==========================================
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const welcomeBtn = document.getElementById('welcome-btn');
    const backToTopBtn = document.getElementById('back-to-top');
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const sections = document.querySelectorAll('section[id], header[id]');

    // ==========================================
    // 1. Mobile Menu Toggling
    // ==========================================
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 2. Welcome Alert Button
    // ==========================================
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', () => {
            alert("Welcome to Tanya Rathore's AI/ML Portfolio!");
        });
    }

    // ==========================================
    // 3. Header Styling & Back-To-Top on Scroll
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Add blur class when user scrolls down
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
    });

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
                    });
                }
            }
        });
    });

    // ==========================================
    // 5. Dynamic Navbar Highlighting on Scroll
    // ==========================================
    const navObserverOptions = {
        root: null, // Viewport
        rootMargin: '-80px 0px -60% 0px', // Shrink threshold to capture active section
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    // Track all sections
    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ==========================================
    // 6. Scroll Reveal Animations
    // ==========================================
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Reveal when 10% of element is in viewport
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve once revealed to keep layout persistent
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    // Register all elements with scroll-reveal class
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});
