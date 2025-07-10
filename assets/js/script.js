// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Video thumbnail switcher
const thumbnails = document.querySelectorAll('.thumbnail');
const videoMain = document.querySelector('.video-main iframe');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add active class to clicked thumbnail
        thumb.classList.add('active');
        // Change video source
        const videoId = thumb.getAttribute('data-video');
        videoMain.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap.from('.hero-title', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero-subtitle', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.stat', {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    delay: 0.6,
    ease: 'power3.out'
});

// About section animations
gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%'
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Music section animations
gsap.from('.track', {
    scrollTrigger: {
        trigger: '.music',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out'
});

// Video section animations
gsap.from('.video-container', {
    scrollTrigger: {
        trigger: '.videos',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Tour section animations
gsap.from('.date', {
    scrollTrigger: {
        trigger: '.tour',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
});

// Contact section animations
gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.social-links a', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Newsletter submission
const newsletterForm = document.querySelector('.footer-newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        alert(`Thank you for subscribing with ${emailInput.value}!`);
        emailInput.value = '';
    });
}