// Modern Contact Section Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tilt effect for info cards
    initTiltEffect();
    
    // Initialize multi-step form
    initMultiStepForm();
    
    // Initialize form submission with animation
    initFormSubmission();
    
    // Add floating animation to the form elements
    animateFormElements();
});

// Tilt effect for contact info cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.contact-info-card[data-effect="tilt"]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const posX = (x - centerX) / centerX; // -1 to 1 range
            const posY = (y - centerY) / centerY; // -1 to 1 range
            
            // Calculate tilt effect (reduce intensity by multiplying with a small value)
            const tiltX = posY * 10; // tilt up/down
            const tiltY = -posX * 10; // tilt left/right
            
            // Apply the tilt transformation
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
            
            // Move the glow effect to mouse position
            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform when mouse leaves
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            
            // Reset glow position
            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.style.left = '-80px';
                glow.style.top = '-80px';
            }
        });
    });
}

// Multi-step form navigation
function initMultiStepForm() {
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressBar = document.querySelector('.progress-bar');
    
    if (!formSteps.length) return;
    
    // Next button functionality
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-next')) - 1;
            const nextStep = parseInt(this.getAttribute('data-next'));
            
            // Validate current step fields before proceeding
            const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            const inputs = currentStepEl.querySelectorAll('input[required], textarea[required]');
            
            let valid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    highlightInvalidField(input);
                }
            });
            
            if (!valid) return;
            
            // Proceed to next step if validation passes
            updateFormStep(currentStep, nextStep);
        });
    });
    
    // Previous button functionality
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-prev')) + 1;
            const prevStep = parseInt(this.getAttribute('data-prev'));
            
            updateFormStep(currentStep, prevStep);
        });
    });
    
    // Update active step and progress
    function updateFormStep(currentStep, targetStep) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show target step
        document.querySelector(`.form-step[data-step="${targetStep}"]`).classList.add('active');
        
        // Update progress indicator
        progressSteps.forEach(step => {
            step.classList.remove('active');
        });
        document.querySelector(`.progress-step[data-step="${targetStep}"]`).classList.add('active');
    }
    
    // Highlight invalid field with animation
    function highlightInvalidField(field) {
        field.classList.add('invalid');
        field.style.animation = 'shake 0.5s ease';
        
        // Add error styles
        field.style.boxShadow = '0 0 0 2px rgba(255, 87, 87, 0.5)';
        
        // Remove animation and invalid class after animation completes
        setTimeout(() => {
            field.style.animation = '';
            
            // Add event listener to remove error styles when user types
            field.addEventListener('input', function removeInvalid() {
                field.classList.remove('invalid');
                field.style.boxShadow = '';
                field.removeEventListener('input', removeInvalid);
            });
        }, 500);
    }
    
    // Add keydown event to allow tab navigation
    document.querySelectorAll('.form-floating input, .form-floating textarea').forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                
                // If in the last input field of step 1, go to step 2
                const currentStep = parseInt(this.closest('.form-step').getAttribute('data-step'));
                if (currentStep === 1 && this.id === 'subject') {
                    document.querySelector('.btn-next[data-next="2"]').click();
                }
                // If in step 2 and the last field, submit the form
                else if (currentStep === 2 && this.id === 'message') {
                    document.querySelector('.btn-submit').click();
                }
            }
        });
    });
}

// Form submission with animation
function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const requiredFields = contactForm.querySelectorAll('input[required], textarea[required]');
        let valid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                valid = false;
                // Highlight invalid field
                field.style.boxShadow = '0 0 0 2px rgba(255, 87, 87, 0.5)';
                field.classList.add('invalid');
                
                // Remove styling on input
                field.addEventListener('input', function removeInvalid() {
                    field.style.boxShadow = '';
                    field.classList.remove('invalid');
                    field.removeEventListener('input', removeInvalid);
                });
            }
        });
        
        if (!valid) return;
        
        // Show success animation if valid
        const submitBtn = contactForm.querySelector('.btn-submit');
        const submitText = submitBtn.querySelector('span');
        const submitIcon = submitBtn.querySelector('i');
        
        // Change button state
        submitBtn.disabled = true;
        submitBtn.style.width = `${submitBtn.offsetWidth}px`; // Lock width to prevent jumping
        submitText.textContent = 'Sending...';
        submitIcon.className = 'fas fa-spinner fa-spin';
        
        // Simulate form submission delay
        setTimeout(() => {
            submitText.textContent = 'Sent!';
            submitIcon.className = 'fas fa-check';
            submitBtn.style.backgroundColor = '#43c6ac';
            
            // Add successful submission animation to form container
            const formContainer = document.querySelector('.form-container');
            formContainer.classList.add('success-animation');
            
            // Add confetti effect
            createConfetti();
            
            // Reset form after 2 seconds
            setTimeout(() => {
                contactForm.reset();
                
                // Return to step 1
                updateFormStepAfterSubmission();
                
                // Reset button
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitIcon.className = 'fas fa-paper-plane';
                submitBtn.style.backgroundColor = '';
                submitBtn.style.width = '';
                
                // Remove success animation class
                formContainer.classList.remove('success-animation');
            }, 2000);
        }, 1500);
    });
}

// Update form step after submission
function updateFormStepAfterSubmission() {
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    formSteps.forEach(step => {
        step.classList.remove('active');
    });
    
    formSteps[0].classList.add('active');
    
    progressSteps.forEach(step => {
        step.classList.remove('active');
    });
    
    progressSteps[0].classList.add('active');
}

// Confetti animation for successful form submission
function createConfetti() {
    const formContainer = document.querySelector('.form-container');
    if (!formContainer) return;
    
    const colors = ['#5e17eb', '#43c6ac', '#9c5fff', '#ff9066'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5; // 5-15px
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.background = color;
        
        // Random position at top
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '0';
        
        // Add to container
        formContainer.appendChild(confetti);
        
        // Animate falling
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${formContainer.offsetHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 1500 + 1500,
            easing: 'cubic-bezier(.215,.61,.355,1)'
        });
        
        // Remove after animation
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Animate floating elements around the form
function animateFormElements() {
    const elements = document.querySelectorAll('.form-floating-elements .floating-element');
    if (!elements.length) return;
    
    elements.forEach((el, index) => {
        // Set initial random position
        const randomX = Math.random() * 20 - 10; // -10 to 10
        const randomY = Math.random() * 20 - 10; // -10 to 10
        
        el.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        // Add event listener to form container to affect elements on hover
        const formContainer = document.querySelector('.form-container');
        
        if (formContainer) {
            formContainer.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position within the element
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / centerX * 15; // -15 to 15px movement
                const moveY = (y - centerY) / centerY * 15; // -15 to 15px movement
                
                // Move elements in opposite directions based on index
                const direction = index % 2 === 0 ? 1 : -1;
                
                // Apply movement with transition
                el.style.transition = 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                el.style.transform = `translate(${randomX + moveX * direction}px, ${randomY + moveY * direction}px)`;
            });
            
            // Reset position when mouse leaves
            formContainer.addEventListener('mouseleave', function() {
                el.style.transform = `translate(${randomX}px, ${randomY}px)`;
            });
        }
    });
}

// Add CSS for shake animation and confetti
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.form-container.success-animation {
    animation: successPulse 0.5s ease;
}

@keyframes successPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}

.confetti {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
}
`;
document.head.appendChild(style); 