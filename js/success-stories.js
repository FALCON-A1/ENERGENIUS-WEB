document.addEventListener('DOMContentLoaded', function() {
    // Create the modal container and add it to the body
    const modalTemplate = `
        <div class="case-study-modal">
            <div class="modal-content">
                <div class="modal-close"><i class="fas fa-times"></i></div>
                <div class="modal-header">
                    <div class="modal-category"></div>
                    <h2 class="modal-title"></h2>
                </div>
                <div class="modal-description"></div>
                <div class="modal-stats"></div>
                <div class="implementation-section">
                    <h3 class="implementation-title">Implementation</h3>
                    <ul class="implementation-list"></ul>
                </div>
                <div class="modal-footer">
                    <a href="#" class="btn-case-study">
                        <span>Read Full Case Study</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalTemplate);

    // Get elements
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    const modal = document.querySelector('.case-study-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');
    
    // Reveal cards on load/scroll with a staggered delay
    function revealCards() {
        caseStudyCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('revealed');
            }, 200 * index);
        });
    }
    
    // Initial reveal
    setTimeout(revealCards, 500);
    
    // Replace "Click to reveal details" with the new button for all cards
    caseStudyCards.forEach(card => {
        const cardContent = card.querySelector('.card-content');
        const oldButton = card.querySelector('.hover-instruction');
        
        if (oldButton) {
            oldButton.remove();
        }
        
        // Create new button
        const viewMoreBtn = document.createElement('button');
        viewMoreBtn.className = 'view-more-btn';
        viewMoreBtn.innerHTML = '<span>View Case Study</span><i class="fas fa-arrow-right"></i>';
        cardContent.appendChild(viewMoreBtn);
    });
    
    // Add click event to cards - using event delegation for better performance
    document.querySelector('.case-studies-grid').addEventListener('click', function(e) {
        // Find the button or card that was clicked
        const viewMoreBtn = e.target.closest('.view-more-btn');
        const card = e.target.closest('.case-study-card');
        
        if (viewMoreBtn || card) {
            // If clicked on button or card, get the card data
            const cardToOpen = viewMoreBtn ? viewMoreBtn.closest('.case-study-card') : card;
            openCaseStudyModal(cardToOpen);
            
            // Prevent default if it was a link
            e.preventDefault();
        }
    });
    
    // Close modal when clicking on close button or outside modal content
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Open modal function
    function openCaseStudyModal(card) {
        // Get data from the card
        const category = card.querySelector('.card-category').textContent;
        const title = card.querySelector('h3').textContent;
        const description = card.dataset.description || 
                           "Detailed implementation of energy-saving solutions resulting in significant cost reduction and improved sustainability metrics.";
        
        // Get stats
        const statsElements = card.querySelectorAll('.stat');
        let statsHTML = '';
        
        statsElements.forEach(stat => {
            const value = stat.querySelector('.value').textContent;
            const label = stat.querySelector('.label').textContent;
            
            statsHTML += `
                <div class="stat">
                    <div class="stat-value">${value}</div>
                    <div class="stat-label">${label}</div>
                </div>
            `;
        });
        
        // Get implementation items - extract from the card back if possible
        let implementationItems = [];
        const cardBackItems = card.querySelectorAll('.implementation-details li');
        
        if (cardBackItems.length > 0) {
            cardBackItems.forEach(item => {
                implementationItems.push(item.textContent.trim());
            });
        } else {
            // Default items if none found
            implementationItems = [
                "Energy monitoring and optimization system implementation",
                "Smart controls and automation integration",
                "Staff training and sustainability protocols",
                "Continuous improvement and monitoring program"
            ];
        }
        
        let implementationHTML = '';
        implementationItems.forEach(item => {
            implementationHTML += `<li class="implementation-item"><i class="fas fa-check"></i>${item}</li>`;
        });
        
        // Populate modal
        modal.querySelector('.modal-category').textContent = category;
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-description').textContent = description;
        modal.querySelector('.modal-stats').innerHTML = statsHTML;
        modal.querySelector('.implementation-list').innerHTML = implementationHTML;
        
        // Show modal with animation
        modal.classList.add('active');
        setTimeout(() => {
            modalContent.style.transform = 'translateY(0)';
            modalContent.style.opacity = '1';
        }, 50);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal function
    function closeModal() {
        modalContent.style.transform = 'translateY(50px)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('active');
            // Re-enable body scrolling
            document.body.style.overflow = '';
        }, 400);
    }
    
    // Filter functionality for case studies
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter cards
            caseStudyCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = '';
                    
                    // Animate cards back in
                    setTimeout(() => {
                        card.classList.add('revealed');
                    }, 100);
                } else {
                    card.classList.remove('revealed');
                    
                    // Hide card after animation completes
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Optional: Add parallax effect on card hover
    caseStudyCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            // Calculate mouse position relative to card center
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation angle (limited to a small range)
            const rotateY = mouseX * 0.01; // Max ±10 degrees
            const rotateX = -mouseY * 0.01; // Max ±10 degrees
            
            // Apply transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
            
            // Re-add hover effect 
            if (card.classList.contains('revealed')) {
                card.style.transform = 'translateY(-10px)';
            }
        });
    });
}); 