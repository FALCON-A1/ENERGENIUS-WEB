// QR Code Interactions
document.addEventListener('DOMContentLoaded', function() {
    const qrCode = document.querySelector('.qr-code');
    
    if (qrCode) {
        // Tilt effect based on mouse position
        qrCode.addEventListener('mousemove', function(e) {
            const boundingRect = this.getBoundingClientRect();
            const mouseX = e.clientX - boundingRect.left;
            const mouseY = e.clientY - boundingRect.top;
            
            // Calculate rotation based on mouse position
            const centerX = boundingRect.width / 2;
            const centerY = boundingRect.height / 2;
            
            const rotateY = ((mouseX - centerX) / centerX) * 10; // Max 10 degrees
            const rotateX = ((centerY - mouseY) / centerY) * 10; // Max 10 degrees
            
            // Apply the rotation
            this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Add shadow effect based on rotation
            const deviceFrame = this.querySelector('.device-frame');
            if (deviceFrame) {
                const shadowX = rotateY * -0.5;
                const shadowY = rotateX * 0.5;
                const shadowBlur = 10 + Math.abs(rotateX) + Math.abs(rotateY);
                deviceFrame.style.boxShadow = `
                    ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.2),
                    0 0 0 2px rgba(0, 0, 0, 0.1),
                    inset 0 0 5px rgba(0, 0, 0, 0.3)
                `;
            }
        });
        
        // Reset rotation when mouse leaves
        qrCode.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            // Reset device frame shadow
            const deviceFrame = this.querySelector('.device-frame');
            if (deviceFrame) {
                deviceFrame.style.boxShadow = '';
            }
        });
        
        // Click to copy URL (simulated app download link)
        qrCode.addEventListener('click', function() {
            // Create a temporary URL (this would be your actual app download URL)
            const appUrl = 'https://energenius.com/app/download';
            
            // Create a temporary textarea to copy the URL
            const textarea = document.createElement('textarea');
            textarea.value = appUrl;
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                // Copy the URL to clipboard
                document.execCommand('copy');
                
                // Show a success message
                const tooltip = this.querySelector('.qr-code-tooltip');
                if (tooltip) {
                    const originalText = tooltip.textContent;
                    tooltip.textContent = 'Download link copied!';
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                    tooltip.style.transform = 'translateX(-50%) translateY(0)';
                    
                    // Add a visual feedback
                    const deviceFrame = this.querySelector('.device-frame');
                    if (deviceFrame) {
                        deviceFrame.style.boxShadow = '0 0 15px rgba(94, 23, 235, 0.5), 0 0 0 2px rgba(94, 23, 235, 0.3), inset 0 0 5px rgba(0, 0, 0, 0.3)';
                        
                        setTimeout(() => {
                            deviceFrame.style.boxShadow = '';
                        }, 500);
                    }
                    
                    // Reset tooltip after 2 seconds
                    setTimeout(() => {
                        tooltip.textContent = originalText;
                        if (!this.matches(':hover')) {
                            tooltip.style.opacity = '';
                            tooltip.style.visibility = '';
                            tooltip.style.transform = '';
                        }
                    }, 2000);
                }
            } catch (err) {
                console.error('Failed to copy URL: ', err);
            }
            
            document.body.removeChild(textarea);
        });
    }
}); 