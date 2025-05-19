// Lightning Effect for Hero Badge
document.addEventListener('DOMContentLoaded', function() {
    // Make the bolt icon interactive
    const boltIcon = document.querySelector('.hero-badge i.fas.fa-bolt');
    
    if (boltIcon) {
        console.log('Lightning effect initialized');
        
        boltIcon.addEventListener('click', function(event) {
            console.log('Bolt clicked!');
            event.preventDefault();
            
            // Create an energetic effect when clicked
            const badge = document.querySelector('.hero-badge');
            
            // Add a special animation class
            badge.classList.add('energized');
            
            // Create lightning effect elements around the icon
            for (let i = 0; i < 8; i++) {
                const lightning = document.createElement('div');
                lightning.classList.add('lightning-bolt');
                
                // Random position and rotation
                const angle = Math.random() * 360;
                const distance = 20 + Math.random() * 40;
                const x = Math.cos(angle * Math.PI / 180) * distance;
                const y = Math.sin(angle * Math.PI / 180) * distance;
                
                lightning.style.position = 'absolute';
                lightning.style.width = '3px';
                lightning.style.height = '20px';
                lightning.style.background = 'linear-gradient(to bottom, #ff9500, #ffcc00)';
                lightning.style.borderRadius = '2px';
                lightning.style.opacity = '0';
                lightning.style.zIndex = '1000';
                lightning.style.left = `calc(50% + ${x}px)`;
                lightning.style.top = `calc(50% + ${y}px)`;
                lightning.style.transform = `rotate(${angle}deg) scale(${0.5 + Math.random() * 0.5})`;
                lightning.style.animation = 'lightning-flash 0.5s ease-out forwards';
                
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
});

// Add the animation to the document if it doesn't exist
if (!document.getElementById('lightning-animations')) {
    const style = document.createElement('style');
    style.id = 'lightning-animations';
    style.textContent = `
        @keyframes lightning-flash {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            20% {
                opacity: 1;
                transform: scale(1);
            }
            80% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: scale(0.3);
            }
        }
        
        @keyframes badge-pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 149, 0, 0.4);
            }
            70% {
                box-shadow: 0 0 0 20px rgba(255, 149, 0, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 149, 0, 0);
            }
        }
        
        .hero-badge.energized {
            animation: badge-pulse 1s ease;
            position: relative;
        }
    `;
    document.head.appendChild(style);
} 