// This file contains the JavaScript code for the portfolio. 
// It includes functionality for interactive elements, animations, and dynamic behavior.

document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect for the typing text
    const typewriterElement = document.getElementById('typewriter');
    const textArray = ['Web Developer', 'Meta Ads Manager', 'UI/UX Designer'];
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textIndex].length) {
            typewriterElement.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(deleteText, 2000);
        }
    }

    function deleteText() {
        if (charIndex > 0) {
            typewriterElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteText, 50);
        } else {
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 500);
        }
    }

    type();

    // Navigation burger menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal timeline items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Add active class to current nav section
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});