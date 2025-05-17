// Particle Animation System for Hero Section
// Advanced interactive canvas-based particle system with mouse interaction

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mousePosition = {
        x: null,
        y: null
    };
    let hue = 0;
    let animationId;
    
    // Set canvas to full width/height of its container
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    // Initial resize and add event listener for window resize
    resizeCanvas();
    window.addEventListener('resize', function() {
        resizeCanvas();
        initParticles(); // Reinitialize particles when canvas is resized
    });
    
    // Track mouse position for particle interaction
    document.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mousePosition.x = e.clientX - rect.left;
        mousePosition.y = e.clientY - rect.top;
    });
    
    // Reset mouse position when mouse leaves canvas
    document.addEventListener('mouseout', function() {
        mousePosition.x = null;
        mousePosition.y = null;
    });
    
    // Particle class with enhanced properties
    class Particle {
        constructor(x, y, size, color, speed, opacity) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.baseColor = color;
            this.speed = speed;
            this.opacity = opacity;
            this.vx = (Math.random() - 0.5) * this.speed;
            this.vy = (Math.random() - 0.5) * this.speed;
            this.expandRate = Math.random() * 0.3;
            this.initialSize = size;
            this.maxSize = size * 3;
            this.isExpanding = false;
            this.pulseSpeed = 0.02 + Math.random() * 0.05;
            this.pulseAmount = 0.5 + Math.random() * 1.5;
            this.angle = Math.random() * 360;
            this.rotateSpeed = (Math.random() - 0.5) * 0.02;
        }
        
        // Update particle position and properties
        update() {
            this.angle += this.rotateSpeed;
            
            // Glow effect when near mouse
            if (mousePosition.x && mousePosition.y) {
                const dx = mousePosition.x - this.x;
                const dy = mousePosition.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Attract particles toward mouse
                if (distance < 120) {
                    const attractForce = 0.2;
                    this.vx += (dx / distance) * attractForce;
                    this.vy += (dy / distance) * attractForce;
                    
                    // Change color based on distance to mouse - using the global hue variable
                    this.color = `hsla(${hue}, 100%, 70%, ${this.opacity})`;
                    
                    // Expand particle when near mouse
                    if (!this.isExpanding && this.size < this.maxSize) {
                        this.size += this.expandRate;
                    }
                } else {
                    // Gradually revert to original color
                    this.color = this.baseColor;
                    // Shrink back to original size
                    if (this.size > this.initialSize) {
                        this.size -= this.expandRate;
                    }
                }
            } else {
                // Pulse size when mouse isn't present
                this.size = this.initialSize + Math.sin(Date.now() * this.pulseSpeed) * this.pulseAmount;
                this.color = this.baseColor;
            }
            
            // Add some natural variance to movement
            this.vx += (Math.random() - 0.5) * 0.01;
            this.vy += (Math.random() - 0.5) * 0.01;
            
            // Apply velocity with damping
            this.vx *= 0.98;
            this.vy *= 0.98;
            
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        // Draw particle with various shapes
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            
            // Randomly choose different particle shapes
            const shapeType = Math.floor(this.x * this.y) % 4;
            
            switch(shapeType) {
                case 0: // Circle
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 1: // Square
                    ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
                    break;
                    
                case 2: // Triangle
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size);
                    ctx.lineTo(-this.size, this.size);
                    ctx.lineTo(this.size, this.size);
                    ctx.closePath();
                    ctx.fill();
                    break;
                    
                case 3: // Diamond
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size);
                    ctx.lineTo(this.size, 0);
                    ctx.lineTo(0, this.size);
                    ctx.lineTo(-this.size, 0);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }
            
            ctx.restore();
        }
        
        // Draw connection lines between nearby particles
        drawConnections(particles) {
            for (let i = 0; i < particles.length; i++) {
                const otherParticle = particles[i];
                if (otherParticle === this) continue;
                
                const dx = this.x - otherParticle.x;
                const dy = this.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(120, 120, 230, ${0.15 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Initialize particles
    function initParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 15000), 100);
        
        for (let i = 0; i < particleCount; i++) {
            const size = 1 + Math.random() * 3;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speed = 0.5 + Math.random();
            const opacity = 0.3 + Math.random() * 0.5;
            
            // Create particles with varying colors based on position
            const particleHue = (x / canvas.width) * 60 + 220; // Range of blue-purple colors
            const color = `hsla(${particleHue}, 90%, 70%, ${opacity})`;
            
            particles.push(new Particle(x, y, size, color, speed, opacity));
        }
    }
    
    // Animation loop
    function animate() {
        // Clear canvas with a subtle background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            particles[i].drawConnections(particles);
        }
        
        // Global hue shift for color animations
        hue = (hue + 0.5) % 360;
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    function startAnimation() {
        // Cancel any existing animation
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        initParticles();
        animate();
    }
    
    // Initialize
    startAnimation();
    
    // Pause animation when tab is not visible to save resources
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}); 