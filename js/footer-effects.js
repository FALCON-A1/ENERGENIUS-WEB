// Footer Animation Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize footer particles
    initFooterParticles();
    
    // Add hover effects to social links
    initSocialLinkEffects();
    
    // Add parallax effect to footer
    initFooterParallax();
    
    // Generate footer pattern gradient animation
    createGradientPatterns();
});

// Create and animate particles in the footer
function initFooterParticles() {
    const footerParticles = document.getElementById('footerParticles');
    if (!footerParticles) return;
    
    // Configuration
    const config = {
        particleCount: 30,
        particleSize: [3, 8],
        colors: ['#5e17eb', '#43c6ac', '#ffffff', '#9c5fff'],
        speed: [0.5, 1.5],
        opacity: [0.2, 0.5]
    };
    
    // Create particles
    for (let i = 0; i < config.particleCount; i++) {
        createParticle(footerParticles, config);
    }
    
    // Start animation loop
    animateParticles(footerParticles);
}

// Create a single particle
function createParticle(container, config) {
    const particle = document.createElement('div');
    
    // Random properties
    const size = Math.random() * (config.particleSize[1] - config.particleSize[0]) + config.particleSize[0];
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];
    const opacity = Math.random() * (config.opacity[1] - config.opacity[0]) + config.opacity[0];
    const speed = Math.random() * (config.speed[1] - config.speed[0]) + config.speed[0];
    
    // Position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Styling
    particle.classList.add('footer-particle');
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        opacity: ${opacity};
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        filter: blur(${size / 2}px);
        box-shadow: 0 0 ${size * 2}px ${color.replace(')', ', 0.5)')};
        pointer-events: none;
        transform: translate3d(0, 0, 0);
        z-index: 1;
    `;
    
    // Custom attributes for animation
    particle.dataset.speed = speed;
    particle.dataset.direction = Math.random() < 0.5 ? 1 : -1;
    particle.dataset.size = size;
    particle.dataset.angle = Math.random() * 360;
    
    container.appendChild(particle);
}

// Animate all particles
function animateParticles(container) {
    const particles = container.querySelectorAll('.footer-particle');
    
    // Define animation properties for each particle
    particles.forEach(particle => {
        const speed = parseFloat(particle.dataset.speed);
        const direction = parseFloat(particle.dataset.direction);
        let angle = parseFloat(particle.dataset.angle);
        
        // Animation function
        function animate() {
            angle += speed * 0.01;
            const radius = parseInt(particle.dataset.size) * 4;
            
            // Calculate new position based on circular motion
            const x = parseFloat(particle.style.left) + Math.cos(angle) * 0.1 * direction;
            const y = parseFloat(particle.style.top) + Math.sin(angle) * 0.1;
            
            // Apply new position with boundaries check
            if (x < 0 || x > 100) {
                particle.dataset.direction = -direction;
            } else {
                particle.style.left = x + '%';
            }
            
            particle.style.top = y + '%';
            
            // Continue animation
            requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
    });
}

// Add hover effects to social links in footer
function initSocialLinkEffects() {
    const socialLinks = document.querySelectorAll('.footer .social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'social-ripple';
            
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
            `;
            
            this.appendChild(ripple);
            
            // Animate ripple
            const animation = ripple.animate([
                { width: '0', height: '0', opacity: 0.8 },
                { width: '150px', height: '150px', opacity: 0 }
            ], {
                duration: 700,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
            });
            
            animation.onfinish = () => {
                ripple.remove();
            };
            
            // Add floating icon effect
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
                icon.style.transform = 'translateY(-5px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateY(0)';
            }
        });
    });
}

// Add parallax effect to footer elements
function initFooterParallax() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    window.addEventListener('mousemove', function(e) {
        const footerRect = footer.getBoundingClientRect();
        
        // Check if footer is in viewport
        if (footerRect.top < window.innerHeight && footerRect.bottom > 0) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = (e.clientY - footerRect.top) / footerRect.height - 0.5;
            
            // Apply parallax to particles
            const particles = document.querySelectorAll('.footer-particle');
            particles.forEach(particle => {
                const speed = parseFloat(particle.dataset.speed);
                const moveX = mouseX * 20 * speed;
                const moveY = mouseY * 20 * speed;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            // Apply subtle parallax to footer content
            const footerGrid = document.querySelector('.footer-grid');
            if (footerGrid) {
                footerGrid.style.transform = `translate(${mouseX * -10}px, ${mouseY * -10}px)`;
            }
        }
    });
}

// Generate animated gradient patterns for footer background
function createGradientPatterns() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    // Create pattern container if it doesn't exist
    let patternContainer = document.querySelector('.footer-pattern-container');
    if (!patternContainer) {
        patternContainer = document.createElement('div');
        patternContainer.className = 'footer-pattern-container';
        patternContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        `;
        footer.appendChild(patternContainer);
    }
    
    // Create multiple gradient blobs
    for (let i = 0; i < 3; i++) {
        const blob = document.createElement('div');
        blob.className = 'footer-blob';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 300 + 200;
        
        // Random colors
        const colorIndex = i % 3;
        let gradient;
        
        if (colorIndex === 0) {
            gradient = 'radial-gradient(circle, rgba(94, 23, 235, 0.1) 0%, rgba(94, 23, 235, 0) 70%)';
        } else if (colorIndex === 1) {
            gradient = 'radial-gradient(circle, rgba(67, 198, 172, 0.1) 0%, rgba(67, 198, 172, 0) 70%)';
        } else {
            gradient = 'radial-gradient(circle, rgba(156, 95, 255, 0.1) 0%, rgba(156, 95, 255, 0) 70%)';
        }
        
        // Apply styles
        blob.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${gradient};
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            transform: translate(-50%, -50%);
            opacity: 0.8;
            filter: blur(30px);
            animation: blobFloat${i + 1} ${20 + i * 5}s infinite alternate ease-in-out;
        `;
        
        patternContainer.appendChild(blob);
    }
    
    // Add keyframes for blob animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blobFloat1 {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-30%, -40%) scale(1.3); }
            100% { transform: translate(-60%, -30%) scale(0.8); }
        }
        
        @keyframes blobFloat2 {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-40%, -50%) scale(0.7); }
            100% { transform: translate(-20%, -60%) scale(1.2); }
        }
        
        @keyframes blobFloat3 {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-60%, -30%) scale(1.1); }
            100% { transform: translate(-40%, -80%) scale(0.9); }
        }
        
        .footer-about, .footer-links, .footer-newsletter {
            position: relative;
            z-index: 2;
        }
        
        .footer .social-link {
            position: relative;
            overflow: hidden;
        }
    `;
    
    document.head.appendChild(style);
} 