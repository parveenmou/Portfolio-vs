// Wait for all resources to load
// Updated: Added typewriter effect functionality
window.addEventListener('load', function() {
    console.log('Window load event fired');
    
    // Initialize Lucide icons with a delay
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            console.log('Lucide loaded, creating icons...');
            lucide.createIcons();
        } else {
            console.warn('Lucide library not loaded yet');
        }
    }, 200);
});

// Also run on DOMContentLoaded as backup
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Initialize Lucide icons
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            console.log('Initializing icons on DOMContentLoaded');
            lucide.createIcons();
        }
    }, 100);

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Typewriter effect with typing animation
    const roles = [
        'Meta Ads Manager',
        'Web Developer',
        'Digital Marketer',
        'Growth Strategist',
    ];
    let roleIndex = 0;
    const typewriterWord = document.getElementById('typewriter-word');

    function typeText(element, text, speed = 60) {
        return new Promise(resolve => {
            element.textContent = '';
            element.classList.add('active');
            let displayText = '';
            let index = 0;
            
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    displayText += text[index];
                    element.textContent = displayText;
                    index++;
                } else {
                    clearInterval(typeInterval);
                    resolve();
                }
            }, speed);
        });
    }

    function eraseText(element, speed = 40) {
        return new Promise(resolve => {
            let text = element.textContent;
            let displayText = text;
            
            const eraseInterval = setInterval(() => {
                if (displayText.length > 0) {
                    displayText = displayText.substring(0, displayText.length - 1);
                    element.textContent = displayText;
                } else {
                    clearInterval(eraseInterval);
                    resolve();
                }
            }, speed);
        });
    }

    async function changeRole() {
        if (typewriterWord) {
            await eraseText(typewriterWord, 40);
            roleIndex = (roleIndex + 1) % roles.length;
            await typeText(typewriterWord, roles[roleIndex], 60);
            
            // Keep blinking cursor visible
            setTimeout(() => {
                typewriterWord.classList.add('active');
            }, 100);
        }
    }

    // Start typewriter effect
    if (typewriterWord) {
        (async () => {
            await typeText(typewriterWord, roles[0], 60);
            // Change role every 4 seconds (typing + erase + pause)
            setInterval(changeRole, 4000);
        })();
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Portfolio filtering
    window.filterPortfolio = function(category) {
        const items = document.querySelectorAll('.portfolio-item');
        const buttons = document.querySelectorAll('.filter-btn');

        // Update active button
        buttons.forEach(btn => btn.classList.remove('active', 'bg-purple-600', 'text-white'));
        event.target.classList.add('active', 'bg-purple-600', 'text-white');

        // Filter items
        items.forEach(item => {
            if (category === 'all') {
                item.classList.remove('hidden-item');
                item.style.display = 'block';
            } else {
                if (item.classList.contains(category)) {
                    item.classList.remove('hidden-item');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden-item');
                    item.style.display = 'none';
                }
            }
        });
    };

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Observe service cards
    document.querySelectorAll('.bg-slate-950').forEach(card => {
        if (card.parentElement.id === 'services' || card.closest('#services')) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        }
    });

    // Add animation to stats
    const statsSection = document.querySelector('.border-y');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElements = entry.target.querySelectorAll('[class*="text-4xl"]');
                    statElements.forEach(stat => {
                        const finalValue = stat.textContent;
                        let currentValue = 0;
                        
                        const increment = () => {
                            currentValue += Math.ceil(parseInt(finalValue) / 20);
                            if (currentValue >= parseInt(finalValue)) {
                                stat.textContent = finalValue;
                            } else {
                                stat.textContent = currentValue + '+';
                                setTimeout(increment, 30);
                            }
                        };
                        
                        increment();
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        statsObserver.observe(statsSection);
    }

    // Contact button functionality
    const contactBtn = document.querySelector('a[href="#contact"]');
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Reinitialize icons on dynamic content
    const observerForIcons = new MutationObserver(() => {
        lucide.createIcons();
    });

    observerForIcons.observe(document.body, {
        childList: true,
        subtree: true
    });

    // ========== PROJECT TABS FUNCTIONALITY ==========
    const projectTabs = document.querySelectorAll('.project-tab');
    const projectContents = document.querySelectorAll('.project-content');

    projectTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the project identifier from data attribute
            const projectId = this.getAttribute('data-project');
            
            // Remove active class from all tabs and contents
            projectTabs.forEach(t => t.classList.remove('active'));
            projectContents.forEach(content => content.classList.remove('active', 'hidden'));
            
            // Add active class to current tab and content
            this.classList.add('active');
            const activeContent = document.querySelector(`[data-project="${projectId}"]`);
            if (activeContent) {
                activeContent.classList.add('active');
                activeContent.classList.remove('hidden');
            }
        });
    });

    // ========== SCROLL ANIMATIONS FOR SERVICE CARDS ==========
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollAnimateElements.forEach(element => {
        scrollObserver.observe(element);
    });

    console.log('Portfolio script loaded successfully');

});
