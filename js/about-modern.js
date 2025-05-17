document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false
    });
    
    // Hero Particles
    if (document.querySelector('.hero-particles')) {
        particlesJS('heroParticles', {
            particles: {
                number: {
                    value: 80,
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
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
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
                            opacity: 0.5
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
    
    // 3D Floating Image Effect
    const storyImage = document.querySelector('.floating-image');
    if (storyImage) {
        document.addEventListener('mousemove', function(e) {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            // Calculate mouse position as a percentage
            const percentX = (clientX / innerWidth) - 0.5;
            const percentY = (clientY / innerHeight) - 0.5;
            
            // Apply 3D transform based on mouse position
            storyImage.style.transform = `
                perspective(1000px)
                rotateY(${percentX * 6}deg)
                rotateX(${-percentY * 6}deg)
            `;
        });
    }
    
    // Intersection Observer for Story Content Animation
    const storyContentParagraphs = document.querySelectorAll('.story-content p');
    
    const storyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add revealed class with staggered delay
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    storyContentParagraphs.forEach(paragraph => {
        storyObserver.observe(paragraph);
    });
    
    // Timeline Animation
    const timelineLine = document.querySelector('.timeline-line');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Reveal the vertical line
            timelineLine.classList.add('revealed');
            
            // Reveal timeline items with staggered animation
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('revealed');
                }, 500 + (index * 300));
            });
            timelineObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.2 });
    
    if (timelineLine) {
        timelineObserver.observe(document.querySelector('.timeline-section'));
    }
    
    // Counters for stats
    const statsNumbers = document.querySelectorAll('.about-hero-stat-value');
    
    const animateNumber = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const endValue = parseInt(element.getAttribute('data-value'));
                animateNumber(element, 0, endValue, 2000);
                statsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mission and Vision cards hover effect
    const missionCard = document.querySelector('.mission-card');
    const visionCard = document.querySelector('.vision-card');
    
    [missionCard, visionCard].forEach(card => {
        if (!card) return;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        const img = member.querySelector('.img-cover');
        const socialLinks = member.querySelector('.member-social');
        
        member.addEventListener('mouseenter', () => {
            if (img) img.style.transform = 'scale(1.1)';
            if (socialLinks) socialLinks.style.transform = 'translateY(0)';
        });
        
        member.addEventListener('mouseleave', () => {
            if (img) img.style.transform = 'scale(1)';
            if (socialLinks) socialLinks.style.transform = 'translateY(100%)';
        });
    });
    
    // Values items animation
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.value-icon i');
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.value-icon i');
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1)';
            }
        });
    });
    
    // Dark mode compatibility
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save user preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 