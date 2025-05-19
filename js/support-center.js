document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Set initial icon state
        updateThemeToggleIcon();
        
        themeToggle.addEventListener('click', function() {
            // Toggle the theme
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update the HTML attribute
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Save preference to localStorage
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            updateThemeToggleIcon();
        });
    }
    
    // Function to update theme toggle icon based on current theme
    function updateThemeToggleIcon() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const moonIcon = document.querySelector('#themeToggle .fa-moon');
        const sunIcon = document.querySelector('#themeToggle .fa-sun');
        
        if (currentTheme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize hero particles
    if (document.getElementById('supportHeroParticles')) {
        particlesJS('supportHeroParticles', {
            "particles": {
                "number": {
                    "value": 80,
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
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
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
                    "color": "#ffffff",
                    "opacity": 0.4,
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
                            "opacity": 1
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

    // Support search functionality
    const searchInput = document.getElementById('supportSearch');
    const searchClearBtn = document.getElementById('searchClear');

    if (searchInput && searchClearBtn) {
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                searchClearBtn.classList.add('visible');
            } else {
                searchClearBtn.classList.remove('visible');
            }
        });

        searchClearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchClearBtn.classList.remove('visible');
            searchInput.focus();
        });

        // Simple search functionality (can be expanded)
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchQuery = this.value.toLowerCase().trim();
                
                if (searchQuery.length > 0) {
                    // Here you would typically implement a real search
                    // For now, we'll just show an alert
                    alert(`Searching for: ${searchQuery}`);
                    
                    // In a real implementation, you would:
                    // 1. Send the query to a search API
                    // 2. Display the results on the page
                    // 3. Track search analytics
                }
            }
        });
    }

    // FAQ Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active before, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Support form submission
    const supportForm = document.getElementById('supportForm');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            
            // Show success message
            this.innerHTML = `
                <div class="form-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. Our support team will get back to you within 24 hours.</p>
                    <button type="button" class="btn btn-primary" id="newMessageBtn">Send Another Message</button>
                </div>
            `;
            
            // Add event listener to the new message button
            document.getElementById('newMessageBtn').addEventListener('click', function() {
                window.location.reload();
            });
        });
    }

    // Add wave animation
    const wave = document.querySelector('.wave-path');
    if (wave) {
        // Animate the wave
        gsap.to(wave, {
            y: -10,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }

    // Check for GSAP and add fallback if not available
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded, using CSS animation fallback for wave');
        const waveElement = document.querySelector('.animated-wave');
        if (waveElement) {
            waveElement.classList.add('wave-fallback-animation');
        }
    }

    // Handle category card hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon i');
            if (icon) {
                icon.classList.add('fa-bounce');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon i');
            if (icon) {
                icon.classList.remove('fa-bounce');
            }
        });
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Check for Lottie animation and add fallback if it fails to load
    const lottiePlayer = document.querySelector('lottie-player');
    if (lottiePlayer) {
        // Add an error event listener
        lottiePlayer.addEventListener('error', function() {
            console.log('Lottie animation failed to load, using fallback');
            const parentElement = this.parentElement;
            if (parentElement) {
                // Replace with a fallback icon
                parentElement.innerHTML = `
                    <div class="fallback-animation">
                        <i class="fas fa-headset fa-4x"></i>
                    </div>
                `;
            }
        });
        
        // Check if animation loaded after a timeout
        setTimeout(() => {
            if (!lottiePlayer.isLoaded) {
                // Try an alternative animation source
                lottiePlayer.load('https://assets5.lottiefiles.com/packages/lf20_khzniaya.json');
            }
        }, 3000);
    }
}); 