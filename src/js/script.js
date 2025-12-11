// This file contains the JavaScript code for the portfolio. 
// It may include functionality for interactive elements, animations, or any dynamic behavior on the webpage.

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
});