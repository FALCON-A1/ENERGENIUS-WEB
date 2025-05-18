// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure hero dashboard image loads immediately
    const heroDashboardImg = document.querySelector('.hero-image .image-container img');
    if (heroDashboardImg) {
        // Force the image to load if it hasn't already
        if (!heroDashboardImg.complete) {
            const loadImage = new Image();
            loadImage.onload = function() {
                heroDashboardImg.src = this.src;
                heroDashboardImg.classList.add('loaded');
            };
            loadImage.src = heroDashboardImg.getAttribute('src');
        } else {
            heroDashboardImg.classList.add('loaded');
        }
    }
    
    // Make mouse scroll indicator clickable
    const scrollIndicator = document.querySelector('.mouse-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Make the bolt icon interactive
    const boltIcon = document.querySelector('.hero-badge i.fas.fa-bolt');
    if (boltIcon) {
        boltIcon.addEventListener('click', function() {
            // Create an energetic effect when clicked
            const badge = document.querySelector('.hero-badge');
            
            // Add a special animation class
            badge.classList.add('energized');
            
            // Create lightning effect elements around the icon
            for (let i = 0; i < 5; i++) {
                const lightning = document.createElement('div');
                lightning.classList.add('lightning-bolt');
                
                // Random position and rotation
                const angle = Math.random() * 360;
                const distance = 20 + Math.random() * 30;
                const x = Math.cos(angle * Math.PI / 180) * distance;
                const y = Math.sin(angle * Math.PI / 180) * distance;
                
                lightning.style.left = `calc(50% + ${x}px)`;
                lightning.style.top = `calc(50% + ${y}px)`;
                lightning.style.transform = `rotate(${angle}deg) scale(${0.5 + Math.random() * 0.5})`;
                
                badge.appendChild(lightning);
                
                // Remove after animation
                setTimeout(() => {
                    lightning.remove();
                }, 1000);
            }
            
            // Remove the energized class after animation completes
            setTimeout(() => {
                badge.classList.remove('energized');
            }, 1000);
        });
    }
    
    // Ensure about section image loads properly
    const aboutImg = document.querySelector('.about-image-wrapper img');
    if (aboutImg) {
        // Force the image to load if it hasn't already
        if (!aboutImg.complete) {
            const loadAboutImage = new Image();
            loadAboutImage.onload = function() {
                aboutImg.src = this.src;
                aboutImg.classList.add('loaded');
            };
            loadAboutImage.src = aboutImg.getAttribute('src');
        } else {
            aboutImg.classList.add('loaded');
        }
    }
    
    // Preloader functionality
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Show preloader until page is loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('loaded');
            }, 500);
        });
        
        // Fallback to ensure preloader is removed even if load event doesn't fire
        setTimeout(function() {
            preloader.classList.add('loaded');
        }, 2500);
    }
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Enhanced pricing plans functionality
    initPricingPlans();
    
    // Features section enhancements
    initFeatureCards();
    initFeatureFilter();
    
    // About section enhancements
    initAboutSection();
    
    // Initialize 3D tilt effect for pricing plans
    function initPricingPlans() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        const billingToggle = document.getElementById('billingToggle');
        const monthlyLabel = document.getElementById('monthlyLabel');
        const annualLabel = document.getElementById('annualLabel');
        const savingsBadge = document.getElementById('savingsBadge');
        
        // Setup 3D hover effect for pricing cards
        if (pricingCards.length > 0) {
            pricingCards.forEach(card => {
                // 3D mouse movement effect
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Calculate the percentage position
                    const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
                    const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
                    
                    // Apply the 3D transform with subtle rotation
                    this.style.transform = `
                        translateZ(20px)
                        rotateY(${xPercent * 5}deg)
                        rotateX(${yPercent * -5}deg)
                        translateY(-10px)
                    `;
                    
                    // Add depth to child elements based on their position in the DOM tree
                    const childElements = this.querySelectorAll('.plan-name, .plan-price, .plan-features, .plan-cta');
                    childElements.forEach((el, index) => {
                        const zValue = 10 + (index * 5);
                        el.style.transform = `translateZ(${zValue}px)`;
                    });
                });
                
                // Reset transform on mouse leave with smooth transition
                card.addEventListener('mouseleave', function() {
                    this.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    this.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
                    
                    // Reset child elements
                    const childElements = this.querySelectorAll('.plan-name, .plan-price, .plan-features, .plan-cta');
                    childElements.forEach(el => {
                        el.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                        el.style.transform = 'translateZ(0)';
                    });
                    
                    // Remove transition after animation completes
                    setTimeout(() => {
                        this.style.transition = '';
                        childElements.forEach(el => {
                            el.style.transition = '';
                        });
                    }, 500);
                });
                
                // Add shine effect on mousemove
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Create or update shine element
                    let shine = this.querySelector('.shine-effect');
                    if (!shine) {
                        shine = document.createElement('div');
                        shine.className = 'shine-effect';
                        this.appendChild(shine);
                    }
                    
                    // Position shine at cursor
                    shine.style.top = `${y}px`;
                    shine.style.left = `${x}px`;
                });
            });
        }
        
        // Monthly/Annual billing toggle
        if (billingToggle && monthlyLabel && annualLabel) {
            // Toggle between monthly and annual billing
            billingToggle.addEventListener('change', function() {
                const isAnnual = this.checked;
                
                // Update pricing display
                pricingCards.forEach(card => {
                    const priceElement = card.querySelector('.plan-price');
                    const periodElement = card.querySelector('.plan-period');
                    
                    if (priceElement) {
                        // Get the appropriate price
                        const monthlyPrice = priceElement.getAttribute('data-monthly');
                        const annualPrice = priceElement.getAttribute('data-annual');
                        
                        // Apply the price with animation
                        priceElement.style.transform = 'translateY(-20px) scale(0.8)';
                        priceElement.style.opacity = '0';
                        
                        setTimeout(() => {
                            priceElement.textContent = isAnnual ? annualPrice : monthlyPrice;
                            
                            if (periodElement) {
                                periodElement.textContent = isAnnual ? 'per month, billed annually' : 'per month';
                            }
                            
                            priceElement.style.transform = 'translateY(0) scale(1)';
                            priceElement.style.opacity = '1';
                        }, 300);
                    }
                });
                
                // Show/hide savings badge
                if (savingsBadge) {
                    savingsBadge.style.opacity = isAnnual ? '1' : '0';
                }
                
                // Toggle active class for labels
                monthlyLabel.classList.toggle('active', !isAnnual);
                annualLabel.classList.toggle('active', isAnnual);
            });
            
            // Click events for labels to toggle the switch
            monthlyLabel.addEventListener('click', function() {
                billingToggle.checked = false;
                billingToggle.dispatchEvent(new Event('change'));
            });
            
            annualLabel.addEventListener('click', function() {
                billingToggle.checked = true;
                billingToggle.dispatchEvent(new Event('change'));
            });
        }
    }
    
    // Initialize 3D tilt effect for feature cards
    function initFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            // Add mouse move handler for 3D effect
            card.addEventListener('mousemove', function(e) {
                const cardRect = this.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Calculate rotation based on mouse position
                const rotateY = -(mouseX / 10);
                const rotateX = mouseY / 10;
                
                // Apply the transform
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            // Reset transform on mouse leave
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
            
            // Handle card click for mobile devices
            card.addEventListener('click', function() {
                const featureLink = this.querySelector('.feature-link');
                if (window.innerWidth <= 768 && featureLink) {
                    // Toggle link visibility on mobile
                    if (getComputedStyle(featureLink).opacity === '0') {
                        featureLink.style.opacity = '1';
                        featureLink.style.transform = 'translateY(0)';
                    } else {
                        featureLink.style.opacity = '0';
                        featureLink.style.transform = 'translateY(10px)';
                    }
                }
            });
        });
    }
    
    // Filter functionality for feature categories
    function initFeatureFilter() {
        const categoryButtons = document.querySelectorAll('.feature-category');
        const featureCards = document.querySelectorAll('.feature-card');
        
        if (categoryButtons.length > 0) {
            categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const category = this.getAttribute('data-category');
                    
                    // Filter cards
                    featureCards.forEach(card => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            // Show card with animation
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0) translateZ(0)';
                            }, 10);
                        } else {
                            // Hide card with animation
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px) translateZ(0)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
            
            // Add click effect to category buttons
            categoryButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple-effect');
                    
                    const x = e.clientX - e.target.getBoundingClientRect().left;
                    const y = e.clientY - e.target.getBoundingClientRect().top;
                    
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }
    }
    
    // About section enhancements
    function initAboutSection() {
        // Setup 3D tilt effect for About image
        const aboutImage = document.querySelector('.about-image-wrapper');
        if (aboutImage) {
            // 3D mouse movement effect
            aboutImage.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate the percentage position
                const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
                const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
                
                // Apply the 3D transform with subtle rotation
                const floatingImage = this.querySelector('.floating-image-3d');
                if (floatingImage) {
                    floatingImage.style.transform = `
                        translateZ(30px)
                        rotateY(${xPercent * 10}deg)
                        rotateX(${yPercent * -10}deg)
                    `;
                    
                    // Apply to both SVG or image depending on what exists
                    const svgElement = floatingImage.querySelector('.about-placeholder-svg');
                    const imgElement = floatingImage.querySelector('img');
                    
                    const visualElement = svgElement || imgElement;
                    if (visualElement) {
                        visualElement.style.transform = `translateZ(50px)`;
                    }
                    
                    // Move elements based on mouse position for parallax effect
                    const elements = floatingImage.querySelectorAll('.about-element');
                    elements.forEach((el, index) => {
                        const depth = 60 + (index * 5); // Increase z-depth to keep in front
                        const moveX = xPercent * (index + 1) * 10;
                        const moveY = yPercent * (index + 1) * 10;
                        el.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
                    });
                }
            });
            
            // Reset transform on mouse leave with smooth transition
            aboutImage.addEventListener('mouseleave', function() {
                const floatingImage = this.querySelector('.floating-image-3d');
                if (floatingImage) {
                    floatingImage.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    floatingImage.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
                    
                    // Reset both SVG or image
                    const svgElement = floatingImage.querySelector('.about-placeholder-svg');
                    const imgElement = floatingImage.querySelector('img');
                    
                    if (svgElement) {
                        svgElement.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                        svgElement.style.transform = 'translateZ(20px)';
                    }
                    
                    if (imgElement) {
                        imgElement.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                        imgElement.style.transform = 'translateZ(20px)';
                    }
                    
                    // Reset elements
                    const elements = floatingImage.querySelectorAll('.about-element');
                    elements.forEach(el => {
                        el.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                        el.style.transform = 'translateZ(40px)';
                    });
                    
                    // Remove transition after animation completes
                    setTimeout(() => {
                        floatingImage.style.transition = '';
                        if (svgElement) svgElement.style.transition = '';
                        if (imgElement) imgElement.style.transition = '';
                        elements.forEach(el => {
                            el.style.transition = '';
                        });
                    }, 500);
                }
            });
        }
        
        // Animated progress bars
        const progressBars = document.querySelectorAll('.progress-fill');
        if (progressBars.length > 0) {
            // Set the width dynamically from the percentage 
            progressBars.forEach(bar => {
                const percentage = bar.parentElement.previousElementSibling.querySelector('.progress-percentage').textContent;
                bar.style.setProperty('--width', percentage);
            });
            
            // Animate when scrolled into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'progressFill 1.5s ease forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            progressBars.forEach(bar => {
                observer.observe(bar);
            });
        }
        
        // Flip card animation for stat cards
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length > 0) {
            statCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.querySelector('.stat-card-inner').style.transform = 'rotateY(180deg)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.querySelector('.stat-card-inner').style.transform = 'rotateY(0)';
                });
                
                // Touch support for mobile
                card.addEventListener('touchstart', function() {
                    const inner = this.querySelector('.stat-card-inner');
                    if (inner.style.transform === 'rotateY(180deg)') {
                        inner.style.transform = 'rotateY(0)';
                    } else {
                        inner.style.transform = 'rotateY(180deg)';
                    }
                });
            });
        }
        
        // Animate the counter values when scrolled into view
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate counters when about section comes into view
                        animateCounters('.about .counter');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(aboutSection);
        }
        
        // Initialize about section particles
        initAboutParticles();
    }
    
    // Initialize particles for the about section
    function initAboutParticles() {
        const aboutCanvas = document.getElementById('aboutParticles');
        if (!aboutCanvas) return;
        
        const ctx = aboutCanvas.getContext('2d');
        const particles = [];
        const particleCount = 30;
        
        // Set canvas dimensions
        function resizeCanvas() {
            const container = aboutCanvas.parentElement;
            aboutCanvas.width = container.offsetWidth;
            aboutCanvas.height = container.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * aboutCanvas.width;
                this.y = Math.random() * aboutCanvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = `rgba(94, 23, 235, ${Math.random() * 0.3 + 0.1})`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Bounce off edges
                if (this.x > aboutCanvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y > aboutCanvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Create particles
        function initParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        // Animation loop
        function animateParticles() {
            ctx.clearRect(0, 0, aboutCanvas.width, aboutCanvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Connect particles with lines if they're close enough
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(94, 23, 235, ${0.1 * (1 - distance/100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animateParticles);
        }
        
        // Initialize and start animation
        initParticles();
        animateParticles();
    }
    
    // Parallax effect for hero section
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length > 0) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-speed')) || 0.05;
                const x = (window.innerWidth - mouseX * speed) / 100;
                const y = (window.innerHeight - mouseY * speed) / 100;
                
                element.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    }
    
    // Testimonial slider functionality with enhanced animations
    const testimonialSlider = document.getElementById('testimonialSlider');
    const testimonialSlides = document.getElementById('testimonialSlides');
    const testimonialDots = document.getElementById('testimonialDots');
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    const progressBar = document.querySelector('.testimonial-progress-bar');
    
    if (testimonialSlider && testimonialSlides) {
        let currentSlide = 0;
        let slideInterval;
        const autoSlideDelay = 5000; // 5 seconds
        const slides = testimonialSlides.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        const dots = testimonialDots ? testimonialDots.querySelectorAll('.testimonial-dot') : [];
        
        // Initialize animations for the current slide
        initSlideAnimations(currentSlide);
        
        // Start auto-sliding
        startSlideTimer();
        
        // Previous slide button
        if (prevTestimonial) {
            prevTestimonial.addEventListener('click', function() {
                goToSlide(currentSlide - 1);
                
                // Add ripple effect to the button
                createRippleEffect(this);
            });
        }
        
        // Next slide button
        if (nextTestimonial) {
            nextTestimonial.addEventListener('click', function() {
                goToSlide(currentSlide + 1);
                
                // Add ripple effect to the button
                createRippleEffect(this);
            });
        }
        
        // Click on dots
        if (testimonialDots) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    goToSlide(index);
                });
            });
        }
        
        // Pause auto-sliding on hover
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        // Resume auto-sliding when mouse leaves
        testimonialSlider.addEventListener('mouseleave', function() {
            startSlideTimer();
        });
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        }, { passive: true });
        
        testimonialSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startSlideTimer();
        }, { passive: true });
        
        function handleSwipe() {
            const threshold = 50; // Minimum distance required for swipe
            if (touchEndX + threshold < touchStartX) {
                // Swipe left, go to next slide
                goToSlide(currentSlide + 1);
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right, go to previous slide
                goToSlide(currentSlide - 1);
            }
        }
        
        // Function to go to a specific slide
        function goToSlide(index) {
            // Reset all slide animations
            resetSlideAnimations();
            
            // Handle circular navigation
            if (index < 0) {
                index = totalSlides - 1;
            } else if (index >= totalSlides) {
                index = 0;
            }
            
            currentSlide = index;
            
            // Update slides position
            updateSlider();
            
            // Update dots
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    if (i === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Update progress bar
            if (progressBar) {
                const progressWidth = ((currentSlide + 1) / totalSlides) * 100;
                progressBar.style.width = `${progressWidth}%`;
            }
            
            // Initialize animations for current slide
            setTimeout(() => {
                initSlideAnimations(currentSlide);
            }, 100);
        }
        
        // Function to update the slider position
        function updateSlider() {
            testimonialSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Function to start the auto-slide timer
        function startSlideTimer() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, autoSlideDelay);
        }
        
        // Function to create a ripple effect on button click
        function createRippleEffect(button) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple-effect');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600); // Match the CSS animation duration
        }
        
        // Reset animations for all slides
        function resetSlideAnimations() {
            const elements = testimonialSlides.querySelectorAll('.testimonial-badge, .testimonial-rating, .quote-icon, .testimonial-content, .testimonial-author');
            
            elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = element.classList.contains('testimonial-badge') ? 'translateY(-10px)' : 
                                         element.classList.contains('testimonial-rating') ? 'translateY(10px)' : 'translateY(20px)';
                element.style.animation = 'none';
            });
        }
        
        // Initialize animations for the active slide
        function initSlideAnimations(slideIndex) {
            const activeSlide = slides[slideIndex];
            
            if (activeSlide) {
                const badge = activeSlide.querySelector('.testimonial-badge');
                const rating = activeSlide.querySelector('.testimonial-rating');
                const quoteIcon = activeSlide.querySelector('.quote-icon');
                const content = activeSlide.querySelector('.testimonial-content');
                const author = activeSlide.querySelector('.testimonial-author');
                
                if (badge) {
                    badge.style.animation = 'fadeInUp 0.5s ease forwards 0.2s';
                }
                
                if (rating) {
                    rating.style.animation = 'fadeInUp 0.5s ease forwards 0.3s';
                }
                
                if (quoteIcon) {
                    quoteIcon.style.animation = 'fadeInUp 0.5s ease forwards 0.4s';
                }
                
                if (content) {
                    content.style.animation = 'fadeInUp 0.5s ease forwards 0.5s';
                }
                
                if (author) {
                    author.style.animation = 'fadeInUp 0.5s ease forwards 0.6s';
                }
            }
        }
        
        // Add 3D tilt effect to testimonial cards
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach(card => {
            card.addEventListener('mousemove', handleTilt);
            card.addEventListener('mouseleave', resetTilt);
        });
        
        function handleTilt(e) {
            const card = this;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt amounts (smaller values for subtle effect)
            const tiltX = (y - centerY) / 15;
            const tiltY = (centerX - x) / 15;
            
            // Apply the transform
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        }
        
        function resetTilt() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    }
    
    // Mobile Menu Toggle with enhanced animations
    const navLinks = document.getElementById('navLinks');
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    if (openMenu) {
        openMenu.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            
            // Bubble effect animation
            const bubbleEffect = document.createElement('span');
            bubbleEffect.classList.add('menu-bubble-effect');
            this.appendChild(bubbleEffect);
            
            // Remove the bubble after animation completes
            setTimeout(() => {
                bubbleEffect.remove();
            }, 500);
            
            // Ensure close button is visible and properly positioned
            if (closeMenu) {
                closeMenu.style.opacity = '1';
                closeMenu.style.visibility = 'visible';
                closeMenu.style.transform = 'scale(1) rotate(0deg)';
                
                // Adjust position for better visibility on all devices
                if (window.innerWidth <= 480) {
                    closeMenu.style.top = '15px';
                    closeMenu.style.right = '15px';
                } else {
                    closeMenu.style.top = '20px';
                    closeMenu.style.right = '20px';
                }
            }
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Rotate animation
            this.style.transform = 'rotate(90deg)';
            
            // Hide the button with animation
            setTimeout(() => {
                this.style.transform = 'rotate(90deg) scale(0)';
                this.style.opacity = '0';
                this.style.visibility = 'hidden';
            }, 300);
        });
        
        // Add a bubble effect to the close button too
        closeMenu.addEventListener('mouseenter', function() {
            const bubbleEffect = document.createElement('span');
            bubbleEffect.classList.add('menu-bubble-effect');
            bubbleEffect.style.background = 'rgba(255, 255, 255, 0.3)';
            this.appendChild(bubbleEffect);
            
            setTimeout(() => {
                bubbleEffect.remove();
            }, 500);
        });
    }
    
    // Handle window resize for proper close button positioning
    window.addEventListener('resize', function() {
        if (navLinks && navLinks.classList.contains('active') && closeMenu) {
            if (window.innerWidth <= 480) {
                closeMenu.style.top = '15px';
                closeMenu.style.right = '15px';
            } else {
                closeMenu.style.top = '20px';
                closeMenu.style.right = '20px';
            }
        }
    });
    
    // Handle dropdown menus on mobile with enhanced animations
    const dropdownToggle = document.querySelectorAll('.has-dropdown > a');
    
    dropdownToggle.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only activate dropdown toggle on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                
                // Close all other dropdowns
                document.querySelectorAll('.has-dropdown').forEach(item => {
                    if (item !== parent && item.classList.contains('active')) {
                        item.classList.remove('active');
                        // Add slide-up animation
                        const dropdown = item.querySelector('.nav-dropdown');
                        dropdown.style.maxHeight = '0';
                    }
                });
                
                // Toggle current dropdown with slide animation
                if (parent.classList.contains('active')) {
                    parent.classList.remove('active');
                    const arrow = this.querySelector('.nav-arrow');
                    arrow.style.transform = 'rotate(0deg)';
                } else {
                    parent.classList.add('active');
                    const arrow = this.querySelector('.nav-arrow');
                    arrow.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
    
    // Add hover effect for desktop dropdown
    if (window.innerWidth > 768) {
        const dropdowns = document.querySelectorAll('.has-dropdown');
        
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                const arrow = this.querySelector('.nav-arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(180deg)';
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                const arrow = this.querySelector('.nav-arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            });
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.has-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
                const arrow = dropdown.querySelector('.nav-arrow');
                if (arrow) {
                    arrow.style.transform = '';
                }
            });
        }
    });
    
    // Enhanced nav links hover effect with magnetic effect
    const navItems = document.querySelectorAll('.nav-links > ul > li > a');
    
    navItems.forEach(item => {
        // Skip dropdown items for hover animation
        if (!item.closest('.has-dropdown')) {
            // Add hover animation
            item.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active') && window.innerWidth > 768) {
                    this.style.transform = 'translateY(-3px)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active') && window.innerWidth > 768) {
                    this.style.transform = '';
                    this.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    
                    // Reset transition after it completes
                    setTimeout(() => {
                        this.style.transition = '';
                    }, 500);
                }
            });
            
            // Add magnetic effect on mousemove with improved natural feeling
            item.addEventListener('mousemove', function(e) {
                if (window.innerWidth > 768) {
                    const bounds = this.getBoundingClientRect();
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;
                    const centerX = bounds.left + bounds.width / 2;
                    const centerY = bounds.top + bounds.height / 2;
                    const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
                    const maxDistance = Math.max(bounds.width, bounds.height) / 2;
                    
                    // Scale down effect based on distance from center for more natural movement
                    const scaleFactor = Math.max(0, 1 - distance / maxDistance);
                    const deltaX = (mouseX - centerX) * 0.15 * scaleFactor;
                    const deltaY = (mouseY - centerY) * 0.15 * scaleFactor;
                    
                    // Smoothly update transform
                    this.style.transition = 'transform 0.1s ease-out';
                    this.style.transform = `translate(${deltaX}px, ${deltaY - 2}px)`;
                }
            });
            
            // Reset position when mouse leaves with smooth transition
            item.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    this.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    this.style.transform = '';
                    
                    // Reset transition after it completes
                    setTimeout(() => {
                        this.style.transition = '';
                    }, 500);
                }
            });
        }
        
        // Click effect for mobile navigation
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && !this.closest('.has-dropdown')) {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('nav-ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
            navLinks.classList.remove('active');
                    document.body.style.overflow = ''; // Restore scrolling
                }, 500);
                
                if (!this.closest('.has-dropdown')) {
                    e.preventDefault();
                }
            }
        });
    });
    
    // Create scroll progress indicator if it doesn't exist
    const header = document.querySelector('.header');
    const existingProgressBar = document.querySelector('.scroll-progress');
    
    if (!existingProgressBar) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-progress';
        header.appendChild(scrollIndicator);
    }
    
    // Enhanced Header scroll effect with progress bar and shadow animation
    window.addEventListener('scroll', function() {
        const scrollIndicator = existingProgressBar || document.querySelector('.scroll-progress');
        if (scrollIndicator) {
            // Progress bar with smooth animation
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollIndicator.style.width = progress + '%';
            
            // Add subtle glow effect when scrolling
            scrollIndicator.style.boxShadow = `0 0 ${Math.min(progress/5, 10)}px rgba(94, 23, 235, 0.5)`;
        }
        
        // Enhanced header background effect with smooth transition
        if (window.scrollY > 50) {
            if (!header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
                // Add subtle animation when header becomes sticky
                header.style.animation = 'none';
                void header.offsetWidth; // Trigger reflow
                header.style.animation = '';
            }
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add active class to nav links on page load based on URL hash
    function setActiveNavOnLoad() {
        const hash = window.location.hash;
        if (hash) {
            const activeNavLink = document.querySelector(`.nav-links a[href="${hash}"]`);
            if (activeNavLink) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                activeNavLink.classList.add('active');
            }
        }
    }
    
    setActiveNavOnLoad();
    
    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    // Function to toggle dark mode
    function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
    
    // Add click event to regular theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }
                    
                    // Calculate header height for offset
                    const headerHeight = header ? header.offsetHeight : 0;
                    
                    // Scroll to the target with offset
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active link highlighting
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        const scrollPosition = window.scrollY + 150; // Offset for highlighting
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
                
                if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value.trim())) {
                        valid = false;
                        input.style.borderColor = 'red';
                    }
                }
            });
            
            if (valid) {
                // In a real implementation, you would send the form data to a server
                
                // Show success message
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                
                // Clear form
                contactForm.reset();
                
                // Append message
                contactForm.appendChild(formMessage);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    formMessage.remove();
                }, 5000);
            }
        });
        
        // Remove red border when user starts typing again
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    // Newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    if (newsletterForms.length > 0) {
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = form.querySelector('input[type="email"]');
                if (!emailInput.value.trim()) {
                    emailInput.style.borderColor = 'red';
                    return;
                }
                
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value.trim())) {
                    emailInput.style.borderColor = 'red';
                    return;
                }
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = 'white';
                successMessage.style.marginTop = '10px';
                
                // Clear input
                emailInput.value = '';
                
                // Add message
                form.appendChild(successMessage);
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            });
        });
    }
    
    // Animation for statistics counters
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            // Skip if already animated
            if (counter.classList.contains('animated')) return;
            
            const countTo = parseInt(counter.textContent);
            let count = 0;
            const speed = 50; // Animation speed
            const originalText = counter.textContent; // Store the original text
            
            const updateCount = () => {
                const increment = countTo / (1000 / speed);
                
                if (count < countTo) {
                    count = Math.ceil(count + increment);
                    
                    // Get the part before the special character if any
                    const text = counter.textContent;
                    const specialChar = text.match(/[^0-9]/);
                    const specialCharIndex = specialChar ? text.indexOf(specialChar[0]) : -1;
                    
                    if (specialCharIndex !== -1) {
                        const suffix = text.substring(specialCharIndex);
                        counter.textContent = count + suffix;
                    } else {
                        counter.textContent = count;
                    }
                    
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = originalText; // Use the stored original text
                }
            };
            
            // Start counter animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counter.classList.add('animated');
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Call the animation function when the page loads
    if (document.querySelectorAll('.counter').length > 0) {
        animateCounters();
    }
    
    // Handle tab navigation on keyboard focus
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Count-up animation for hero stats
    function animateHeroCounters() {
        const counters = document.querySelectorAll('.count-up');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            const startValue = parseInt(counter.textContent) || 0;
            
            function updateCounter(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = ease(progress);
                const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
                
                counter.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            function ease(t) {
                // Easing function: cubic-bezier
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }
            
            requestAnimationFrame(updateCounter);
        });
    }
    
    // Initialize hero counters animation with a slight delay
    setTimeout(animateHeroCounters, 1500);
    
    // Typing animation for subtitle
    function initTypeAnimation() {
        const element = document.querySelector('.typing-animation');
        if (!element) return;
        
        const text = element.textContent;
        element.textContent = '';
        element.style.visibility = 'visible';
        
        let charIndex = 0;
        const typingSpeed = 50; // ms per character
        
        function typeNextChar() {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, typingSpeed);
            } else {
                // Add the blinking cursor when typing is complete
                element.classList.add('typing-complete');
            }
        }
        
        // Start typing with a delay
        setTimeout(typeNextChar, 1000);
    }
    
    // Initialize typing animation
    setTimeout(initTypeAnimation, 500);
    
    // Enhanced pulse animation for the "New" badge in navbar
    function enhanceNavBadgePulse() {
        const navBadge = document.querySelector('.nav-feature-badge');
        if (!navBadge) return;
        
        // Add a more advanced pulsing animation
        const pulseAnimation = [
            { transform: 'scale(1)', opacity: 1, offset: 0 },
            { transform: 'scale(1.2)', opacity: 0.8, offset: 0.5 },
            { transform: 'scale(1)', opacity: 1, offset: 1 }
        ];
        
        const pulseOptions = {
            duration: 1500,
            iterations: Infinity,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        };
        
        // Check if Web Animations API is supported
        if (typeof navBadge.animate === 'function') {
            navBadge.animate(pulseAnimation, pulseOptions);
        }
        
        // Add a subtle glow effect by manipulating box-shadow
        let glowIntensity = 0;
        let increasing = true;
        const glowAnimation = setInterval(() => {
            if (increasing) {
                glowIntensity += 0.05;
                if (glowIntensity >= 1) increasing = false;
            } else {
                glowIntensity -= 0.05;
                if (glowIntensity <= 0) increasing = true;
            }
            
            navBadge.style.boxShadow = `0 0 ${5 + glowIntensity * 10}px rgba(94, 23, 235, ${0.3 + glowIntensity * 0.2})`;
        }, 50);
        
        // Clean up interval when page is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                clearInterval(glowAnimation);
            } else {
                enhanceNavBadgePulse();
            }
        });
    }
    
    // Initialize enhanced badge animation
    enhanceNavBadgePulse();
    
    // Animate testimonial stats counters when they come into view
    const testimonialStats = document.querySelector('.testimonial-stats');
    if (testimonialStats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = testimonialStats.querySelectorAll('.count-up');
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(testimonialStats);
        
        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps approx
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        }
    }
    
    // Platform selector for download section
    function initPlatformSelector() {
        const platformOptions = document.querySelectorAll('.platform-option');
        const mobileButtons = document.getElementById('mobile-buttons');
        const desktopButtons = document.getElementById('desktop-buttons');
        const webButtons = document.getElementById('web-buttons');
        
        if (platformOptions.length > 0) {
            platformOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove active class from all options
                    platformOptions.forEach(opt => opt.classList.remove('active'));
                    
                    // Add active class to selected option
                    this.classList.add('active');
                    
                    // Hide all button groups
                    if (mobileButtons) mobileButtons.style.display = 'none';
                    if (desktopButtons) desktopButtons.style.display = 'none';
                    if (webButtons) webButtons.style.display = 'none';
                    
                    // Show selected button group
                    const platform = this.getAttribute('data-platform');
                    const targetButtons = document.getElementById(`${platform}-buttons`);
                    if (targetButtons) {
                        targetButtons.style.display = 'grid';
                        
                        // Add entrance animation for buttons
                        const buttons = targetButtons.querySelectorAll('.btn-platform');
                        buttons.forEach((btn, index) => {
                            btn.style.opacity = '0';
                            btn.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                btn.style.opacity = '1';
                                btn.style.transform = 'translateY(0)';
                                btn.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            }, 100 * index);
                        });
                    }
                    
                    // Add ripple effect
                    createRippleEffect(this);
                });
            });
            
            // Add hover 3D effect to download buttons
            const platformButtons = document.querySelectorAll('.btn-platform');
            platformButtons.forEach(button => {
                button.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Calculate rotation values
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                });
            });
        }
        
        // Function to create ripple effect
        function createRippleEffect(element) {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple-effect');
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    }
    
    // Call platform selector initialization
    initPlatformSelector();
    
    // Success Stories Section - Case Study Cards with 3D effects and filtering
    function initSuccessStories() {
        const caseStudyCards = document.querySelectorAll('.case-study-card');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        if (caseStudyCards.length === 0 || filterBtns.length === 0) return;
        
        // Create ripple effect when filter buttons are clicked
        filterBtns.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                createRippleEffect(this);
                
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter the case study cards
                filterCaseStudies(filterValue);
            });
        });
        
        // Apply 3D effect to case study cards
        caseStudyCards.forEach(card => {
            // Add mouse move handler for 3D effect on card front
            const cardFront = card.querySelector('.card-front');
            const cardBack = card.querySelector('.card-back');
            
            if (cardFront && cardBack) {
                card.addEventListener('mousemove', function(e) {
                    // Calculate mouse position relative to the card
                    const cardRect = this.getBoundingClientRect();
                    const cardCenterX = cardRect.left + cardRect.width / 2;
                    const cardCenterY = cardRect.top + cardRect.height / 2;
                    
                    // Calculate mouse distance from center as a percentage of card dimensions
                    const mouseX = e.clientX - cardCenterX;
                    const mouseY = e.clientY - cardCenterY;
                    
                    // Convert to rotation angles (reduce intensity for subtler effect)
                    const rotateY = mouseX * 0.05;
                    const rotateX = -mouseY * 0.05;
                    
                    // Apply 3D transform to elements inside card front
                    const elements = cardFront.querySelectorAll('h3, .card-stats, .card-category, .hover-instruction');
                    elements.forEach(el => {
                        const depth = parseFloat(el.style.transform.match(/translateZ\((\d+)px\)/) || [0, 15])[1];
                        el.style.transform = `translateZ(${depth}px) translateX(${rotateY * 0.5}px) translateY(${rotateX * 0.5}px)`;
                    });
                    
                    // Add subtle rotation to card wrapper
                    const wrapper = this.querySelector('.card-3d-wrapper');
                    if (!wrapper.style.transform.includes('rotateY(180deg)')) {
                        wrapper.style.transform = `rotateX(${rotateX * 0.2}deg) rotateY(${rotateY * 0.2}deg)`;
                    }
                });
                
                // Reset transforms on mouse leave
                card.addEventListener('mouseleave', function() {
                    const elements = cardFront.querySelectorAll('h3, .card-stats, .card-category, .hover-instruction');
                    elements.forEach(el => {
                        const depth = parseFloat(el.style.transform.match(/translateZ\((\d+)px\)/) || [0, 15])[1];
                        el.style.transform = `translateZ(${depth}px)`;
                    });
                    
                    const wrapper = this.querySelector('.card-3d-wrapper');
                    if (!wrapper.style.transform.includes('rotateY(180deg)')) {
                        wrapper.style.transform = '';
                    }
                });
            }
        });
        
        // Filter case studies based on category
        function filterCaseStudies(category) {
            caseStudyCards.forEach(card => {
                // Get card category
                const cardCategory = card.getAttribute('data-category');
                
                // Check if card should be shown or hidden
                if (category === 'all' || cardCategory === category) {
                    // Show card with animation
                    card.classList.remove('hidden');
                    card.classList.add('shown');
                } else {
                    // Hide card with animation
                    card.classList.remove('shown');
                    card.classList.add('hidden');
                }
            });
        }
    }
    
    // Initialize Success Stories section
    initSuccessStories();
    
    // Initialize Contact Form Animations
    function initContactSection() {
        const contactCards = document.querySelectorAll('.contact-card');
        const socialLinks = document.querySelectorAll('.social-link');
        const contactFormContainer = document.querySelector('.contact-form-container');
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        const contactInfo = document.querySelector('.contact-info');

        // Enhanced 3D tilt effect for contact cards with depth perception
        if (contactCards.length > 0) {
            contactCards.forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const cardRect = this.getBoundingClientRect();
                    const cardCenterX = cardRect.left + cardRect.width / 2;
                    const cardCenterY = cardRect.top + cardRect.height / 2;
                    
                    // Calculate mouse position relative to card center
                    const mouseX = e.clientX - cardCenterX;
                    const mouseY = e.clientY - cardCenterY;
                    
                    // Calculate tilt rotation (limited to small angle)
                    const tiltX = -(mouseY / cardRect.height * 15);
                    const tiltY = (mouseX / cardRect.width * 15);
                    
                    // Apply transform with cubic-bezier easing
                    this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px) scale(1.03)`;
                    
                    // Move icon with enhanced depth
                    const cardIcon = this.querySelector('.card-icon');
                    if (cardIcon) {
                        cardIcon.style.transform = `translateZ(50px) translate(${tiltY * 0.8}px, ${tiltX * 0.8}px) rotate(${tiltY * 0.5}deg)`;
                        cardIcon.style.boxShadow = `${-tiltY * 0.2}px ${-tiltX * 0.2}px 20px rgba(94, 23, 235, 0.4)`;
                    }
                    
                    // Add subtle movement to content
                    const cardContent = this.querySelector('.card-content');
                    if (cardContent) {
                        cardContent.style.transform = `translateZ(30px) translate(${tiltY * 0.3}px, ${tiltX * 0.3}px)`;
                    }

                    // Add dynamic shadow based on tilt
                    this.style.boxShadow = `
                        ${-tiltY * 0.5}px ${-tiltX * 0.5}px 20px rgba(94, 23, 235, 0.05),
                        ${tiltY * 5}px ${tiltX * 5}px 30px rgba(0, 0, 0, 0.05)
                    `;
                });
                
                // Reset transformations on mouse leave with smooth transition
                card.addEventListener('mouseleave', function() {
                    this.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
                    this.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.05)';
                    
                    const cardIcon = this.querySelector('.card-icon');
                    if (cardIcon) {
                        cardIcon.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
                        cardIcon.style.transform = 'translateZ(30px)';
                        cardIcon.style.boxShadow = '0 10px 20px -10px rgba(94, 23, 235, 0.5)';
                    }
                    
                    const cardContent = this.querySelector('.card-content');
                    if (cardContent) {
                        cardContent.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
                        cardContent.style.transform = 'translateZ(0)';
                    }

                    // Remove transition after completed to prevent interference with mousemove
                    setTimeout(() => {
                        this.style.transition = '';
                        if (cardIcon) cardIcon.style.transition = '';
                        if (cardContent) cardContent.style.transition = '';
                    }, 800);
                });

                // Add magnetic hover effect to card links
                const cardLink = card.querySelector('.card-link');
                if (cardLink) {
                    card.addEventListener('mousemove', function(e) {
                        const linkRect = cardLink.getBoundingClientRect();
                        const linkCenterX = linkRect.left + linkRect.width / 2;
                        const linkCenterY = linkRect.top + linkRect.height / 2;
                        
                        const distanceX = e.clientX - linkCenterX;
                        const distanceY = e.clientY - linkCenterY;
                        
                        // Only apply magnetic effect when close to the link
                        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                        
                        if (distance < 100) {
                            const magnetStrength = (100 - distance) / 100; // Stronger when closer
                            cardLink.style.transform = `translate(${distanceX * 0.3 * magnetStrength}px, ${distanceY * 0.3 * magnetStrength}px)`;
                            cardLink.style.transition = 'transform 0.2s ease-out';
                        } else {
                            cardLink.style.transform = '';
                        }
                    });
                    
                    card.addEventListener('mouseleave', function() {
                        if (cardLink) {
                            cardLink.style.transition = 'transform 0.5s ease-out';
                            cardLink.style.transform = '';
                        }
                    });
                }
            });
        }
        
        // Add tooltip functionality to social links
        if (socialLinks.length > 0) {
            socialLinks.forEach(link => {
                // Add subtle pulsing animation
                link.addEventListener('mouseenter', function() {
                    this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    this.style.transform = 'translateY(-5px) scale(1.1)';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    this.style.transform = '';
                });
            });
        }
        
        // Enhanced 3D tilt effect for contact info container with depth and lighting
        if (contactInfo) {
            contactInfo.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate mouse position relative to center (up to 3 degrees rotation)
                const mouseX = ((e.clientX - centerX) / (rect.width / 2)) * 3;
                const mouseY = ((e.clientY - centerY) / (rect.height / 2)) * 3;
                
                // Apply enhanced 3D transform with subtle scaling
                this.style.transform = `perspective(1000px) translateY(-10px) rotateX(${-mouseY}deg) rotateY(${mouseX}deg) scale(1.02)`;
                
                // Dynamic shadow based on mouse position
                this.style.boxShadow = `
                    ${-mouseX * 5}px ${-mouseY * 5}px 30px rgba(94, 23, 235, 0.1),
                    ${mouseX * 5}px ${mouseY * 5}px 30px rgba(0, 0, 0, 0.05)
                `;
                
                // Animate pseudo-element glow effect by adding a class
                // We can't directly access pseudo-elements, so we'll use a class on the parent
                this.classList.add('glow-active');
                
                // Store the mouse position as custom properties that can be used by the ::before pseudo-element
                this.style.setProperty('--mouse-x', `${-mouseX * 10}%`);
                this.style.setProperty('--mouse-y', `${-mouseY * 10}%`);
            });
            
            contactInfo.addEventListener('mouseleave', function() {
                this.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                this.style.transform = 'perspective(1000px) translateY(-10px) rotateX(1deg) rotateY(-1deg) scale(1)';
                this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.1)';
                
                // Reset glow effect
                this.classList.remove('glow-active');
                
                // Remove transition after completed
                setTimeout(() => {
                    this.style.transition = '';
                }, 800);
            });
        }
        
        // Enhanced form container interactions
        if (contactFormContainer) {
            contactFormContainer.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Subtle hover effect based on mouse position
                this.style.transition = 'none';
                this.style.transform = `perspective(1000px) translateZ(5px) scale(1.01)`;
                
                // Animate floating elements
                const floatingElementsContainer = this.querySelector('.form-floating-elements');
                if (floatingElementsContainer) {
                    const elements = floatingElementsContainer.querySelectorAll('.floating-element');
                    if (elements && elements.length > 0) {
                        elements.forEach((el, index) => {
                            if (el) {
                                const factor = index % 2 === 0 ? 1 : -1;
                                const offsetX = (x / rect.width - 0.5) * 20 * factor;
                                const offsetY = (y / rect.height - 0.5) * 20 * factor;
                                el.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + Math.abs(offsetX) / 200})`;
                            }
                        });
                    }
                }
            });
            
            contactFormContainer.addEventListener('mouseleave', function() {
                this.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                this.style.transform = '';
                
                // Reset floating elements
                const floatingElementsContainer = this.querySelector('.form-floating-elements');
                if (floatingElementsContainer) {
                    const elements = floatingElementsContainer.querySelectorAll('.floating-element');
                    if (elements && elements.length > 0) {
                        elements.forEach(el => {
                            if (el) {
                                el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                                el.style.transform = '';
                            }
                        });
                    }
                    
                    // Remove transition after completed
                    setTimeout(() => {
                        this.style.transition = '';
                        if (elements && elements.length > 0) {
                            elements.forEach(el => {
                                if (el) {
                                    el.style.transition = '';
                                }
                            });
                        }
                    }, 800);
                }
            });
        }
        
        // Enhanced form validation with animated feedback
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                let firstInvalidInput = null;
                
                // Validate each required field with enhanced animations
                formInputs.forEach(input => {
                    const formGroup = input.closest('.form-group');
                    
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        isValid = false;
                        
                        if (!firstInvalidInput) firstInvalidInput = input;
                        
                        // Add validate error class
                        formGroup.classList.add('validate-error');
                        
                        // Add shake animation
                        input.classList.add('shake-error');
                        setTimeout(() => {
                            input.classList.remove('shake-error');
                        }, 600);
                        
                        // Create error message if doesn't exist
                        let errorMsg = formGroup.querySelector('.error-message');
                        if (!errorMsg) {
                            errorMsg = document.createElement('div');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'This field is required';
                            formGroup.appendChild(errorMsg);
                            
                            // Animate in error message
                            errorMsg.style.maxHeight = '0';
                            errorMsg.style.opacity = '0';
                            setTimeout(() => {
                                errorMsg.style.maxHeight = '20px';
                                errorMsg.style.opacity = '1';
                            }, 10);
                        }
                    } else {
                        // Remove error class and message
                        formGroup.classList.remove('validate-error');
                        const errorMsg = formGroup.querySelector('.error-message');
                        if (errorMsg) {
                            errorMsg.style.maxHeight = '0';
                            errorMsg.style.opacity = '0';
                            setTimeout(() => {
                                formGroup.removeChild(errorMsg);
                            }, 300);
                        }
                    }
                });
                
                // Scroll to first invalid input
                if (firstInvalidInput) {
                    firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => {
                        firstInvalidInput.focus();
                    }, 500);
                }
                
                if (isValid) {
                    // Show success animation
                    const submitBtn = this.querySelector('.btn-submit');
                    
                    if (submitBtn) {
                        // Disable form
                        formInputs.forEach(input => {
                            input.setAttribute('disabled', true);
                        });
                        
                        // Add loading state
                        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-circle-notch fa-spin"></i>';
                        submitBtn.classList.add('loading-state');
                        
                        // Simulate form submission (replace with actual form submission)
                        setTimeout(() => {
                            // Change button state to show success
                            submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                            submitBtn.classList.remove('loading-state');
                            submitBtn.classList.add('success-state');
                            
                            // Add success animation to form container
                            contactFormContainer.classList.add('success-animation');
                            
                            // Reset form after delay
                            setTimeout(() => {
                                // Reset form
                                contactForm.reset();
                                
                                // Enable inputs
                                formInputs.forEach(input => {
                                    input.removeAttribute('disabled');
                                });
                                
                                // Reset button
                                submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                                submitBtn.classList.remove('success-state');
                                
                                // Reset form container
                                contactFormContainer.classList.remove('success-animation');
                            }, 3000);
                        }, 1500);
                    }
                }
            });
            
            // Add real-time validation
            formInputs.forEach(input => {
                if (input.hasAttribute('required')) {
                    input.addEventListener('blur', function() {
                        const formGroup = this.closest('.form-group');
                        
                        if (!this.value.trim()) {
                            formGroup.classList.add('validate-error');
                            
                            // Create error message if doesn't exist
                            if (!formGroup.querySelector('.error-message')) {
                                const errorMsg = document.createElement('div');
                                errorMsg.className = 'error-message';
                                errorMsg.textContent = 'This field is required';
                                formGroup.appendChild(errorMsg);
                                
                                // Animate in
                                errorMsg.style.maxHeight = '0';
                                errorMsg.style.opacity = '0';
                                setTimeout(() => {
                                    errorMsg.style.maxHeight = '20px';
                                    errorMsg.style.opacity = '1';
                                }, 10);
                            }
                        } else {
                            formGroup.classList.remove('validate-error');
                            const errorMsg = formGroup.querySelector('.error-message');
                            if (errorMsg) {
                                errorMsg.style.maxHeight = '0';
                                errorMsg.style.opacity = '0';
                                setTimeout(() => {
                                    formGroup.removeChild(errorMsg);
                                }, 300);
                            }
                        }
                    });
                    
                    // Remove error on focus
                    input.addEventListener('focus', function() {
                        const formGroup = this.closest('.form-group');
                        formGroup.classList.remove('validate-error');
                        const errorMsg = formGroup.querySelector('.error-message');
                        if (errorMsg) {
                            errorMsg.style.maxHeight = '0';
                            errorMsg.style.opacity = '0';
                            setTimeout(() => {
                                formGroup.removeChild(errorMsg);
                            }, 300);
                        }
                    });
                }
            });
        }
        
        // Enhanced focus effects on form elements
        if (formInputs.length > 0) {
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    contactFormContainer.classList.add('form-focus-active');
                    
                    // Add focus highlight to form group
                    const formGroup = this.closest('.form-group');
                    if (formGroup) {
                        formGroup.classList.add('input-focused');
                    }
                    
                    // Animate floating elements
                    if (contactFormContainer) {
                        const floatingElementsContainer = contactFormContainer.querySelector('.form-floating-elements');
                        if (floatingElementsContainer) {
                            const elements = floatingElementsContainer.querySelectorAll('.floating-element');
                            if (elements && elements.length > 0) {
                                elements.forEach(el => {
                                    if (el) {
                                        el.style.animationPlayState = 'running';
                                    }
                                });
                            }
                        }
                    }
                });
                
                input.addEventListener('blur', function() {
                    // Check if any field is still in focus
                    const isAnyFocused = Array.from(formInputs).some(inp => inp === document.activeElement);
                    
                    if (!isAnyFocused) {
                        contactFormContainer.classList.remove('form-focus-active');
                        
                        // Reset floating elements
                        if (contactFormContainer) {
                            const floatingElementsContainer = contactFormContainer.querySelector('.form-floating-elements');
                            if (floatingElementsContainer) {
                                const elements = floatingElementsContainer.querySelectorAll('.floating-element');
                                if (elements && elements.length > 0) {
                                    elements.forEach(el => {
                                        if (el) {
                                            el.style.animationPlayState = 'paused';
                                        }
                                    });
                                }
                            }
                        }
                    }
                    
                    // Remove focus highlight from form group
                    const formGroup = this.closest('.form-group');
                    if (formGroup) {
                        formGroup.classList.remove('input-focused');
                    }
                });
            });
        }
        
        // Add floating background animation to contact section
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            contactSection.addEventListener('mousemove', function(e) {
                const pattern = document.querySelector('.contact-bg-pattern');
                if (pattern) {
                    // Enhanced parallax effect
                    const moveX = (window.innerWidth / 2 - e.clientX) * 0.02;
                    const moveY = (window.innerHeight / 2 - e.clientY) * 0.02;
                    
                    pattern.style.transition = 'transform 0.2s ease-out';
                    pattern.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
                
                // Add parallax to certain elements
                const parallaxElements = contactSection.querySelectorAll('.contact-card, .contact-social, .btn-submit');
                
                if (parallaxElements && parallaxElements.length > 0) {
                    const sectionRect = contactSection.getBoundingClientRect();
                    const centerX = sectionRect.left + sectionRect.width / 2;
                    const centerY = sectionRect.top + sectionRect.height / 2;
                    
                    const moveFactorX = (e.clientX - centerX) / (sectionRect.width / 2);
                    const moveFactorY = (e.clientY - centerY) / (sectionRect.height / 2);
                    
                    parallaxElements.forEach((el, index) => {
                        if (el) {
                            // Different parallax speeds based on element index
                            const factor = 5 + (index % 3) * 2;
                            const moveX = moveFactorX * factor;
                            const moveY = moveFactorY * factor;
                            
                            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
                            el.style.transition = 'transform 0.3s ease-out';
                        }
                    });
                }
            });
            
            contactSection.addEventListener('mouseleave', function() {
                const pattern = document.querySelector('.contact-bg-pattern');
                if (pattern) {
                    pattern.style.transition = 'transform 0.5s ease-out';
                    pattern.style.transform = 'translate(0, 0)';
                }
                
                // Reset parallax elements
                const parallaxElements = contactSection.querySelectorAll('.contact-card, .contact-social, .btn-submit');
                if (parallaxElements && parallaxElements.length > 0) {
                    parallaxElements.forEach(el => {
                        if (el) {
                            el.style.transition = 'transform 0.5s ease-out';
                            el.style.transform = '';
                        }
                    });
                }
            });
        }
    }
    
    // Initialize Contact Section
    initContactSection();
    
    // Add some CSS animations via JS for better browser support
    function addContactAnimationsCSS() {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes shake-error {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-5px); }
                40%, 80% { transform: translateX(5px); }
            }
            
            .shake-error {
                animation: shake-error 0.6s ease-in-out;
                border-color: #ff5757 !important;
            }
            
            .form-focus-active {
                box-shadow: 0 25px 50px rgba(94, 23, 235, 0.2) !important;
                border-color: rgba(94, 23, 235, 0.3) !important;
                transform: translateY(-5px) !important;
            }
            
            .input-focused {
                position: relative;
                z-index: 2;
            }
            
            .btn-submit.loading-state {
                background: linear-gradient(45deg, #5e17eb, #7d40ff) !important;
                pointer-events: none;
            }
            
            .btn-submit.success-state {
                background: linear-gradient(45deg, #28a745, #20c997) !important;
                box-shadow: 0 15px 30px rgba(40, 167, 69, 0.3) !important;
            }
            
            .error-message {
                color: #ff5757;
                font-size: 0.8rem;
                margin-top: 0.25rem;
                transition: max-height 0.3s ease, opacity 0.3s ease;
                overflow: hidden;
                transform-origin: top;
            }
            
            .validate-error input,
            .validate-error textarea {
                border-color: #ff5757 !important;
                background-color: rgba(255, 87, 87, 0.05) !important;
            }
            
            .dark-mode .validate-error input,
            .dark-mode .validate-error textarea {
                background-color: rgba(255, 87, 87, 0.1) !important;
            }
            
            .dark-mode .error-message {
                color: #ff8080;
            }
            
            .success-animation {
                animation: successPulse 1s forwards;
            }
            
            @keyframes successPulse {
                0% { box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1); }
                50% { box-shadow: 0 25px 50px rgba(40, 167, 69, 0.3); }
                100% { box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1); }
            }
            
            .dark-mode .success-animation {
                animation: darkSuccessPulse 1s forwards;
            }
            
            @keyframes darkSuccessPulse {
                0% { box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3); }
                50% { box-shadow: 0 25px 50px rgba(40, 167, 69, 0.5); }
                100% { box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Call this function on page load
    window.addEventListener('load', addContactAnimationsCSS);
}); 