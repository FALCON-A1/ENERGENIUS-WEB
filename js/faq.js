document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme (dark/light mode)
    initTheme();
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 50
    });
    
    // Initialize FAQ Particles background
    initFaqParticles();
    
    // Handle search functionality
    initSearchFunctionality();
    
    // Handle accordion functionality
    initAccordion();
    
    // Handle category filtering
    initCategoryFilters();
    
    // Handle sidebar navigation and scrolling
    initSidebarNavigation();
    
    // Initialize Back to Top button
    initBackToTop();
});

// Initialize theme toggle functionality
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (savedTheme === null) {
        // If no saved preference, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

// Initialize FAQ page particles background
function initFaqParticles() {
    const canvas = document.getElementById('faqParticles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX = -this.speedX;
            }
            
            if (this.y < 0 || this.y > canvas.height) {
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
    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    createParticles();
    window.addEventListener('resize', createParticles);
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw and update particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections between particles that are close to each other
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize FAQ search functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('faqSearch');
    const searchClear = document.getElementById('searchClear');
    const accordionItems = document.querySelectorAll('.accordion-item');
    const noResultsMessage = document.createElement('div');
    
    noResultsMessage.className = 'no-results-message';
    noResultsMessage.innerHTML = `
        <div class="no-results-content">
            <i class="fas fa-search"></i>
            <h3>No results found</h3>
            <p>Sorry, we couldn't find any results matching your search.</p>
            <button class="btn btn-primary" id="clearSearchBtn">Clear Search</button>
        </div>
    `;
    
    if (!searchInput || !searchClear) return;
    
    // Show/hide clear button based on input
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        if (searchTerm !== '') {
            searchClear.classList.add('visible');
            searchFAQs(searchTerm);
        } else {
            searchClear.classList.remove('visible');
            resetSearch();
        }
    });
    
    // Clear search input
    searchClear.addEventListener('click', function() {
        searchInput.value = '';
        searchClear.classList.remove('visible');
        resetSearch();
        searchInput.focus();
    });
    
    // Function to search FAQs
    function searchFAQs(searchTerm) {
        let foundResults = false;
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header h3').textContent.toLowerCase();
            const content = item.querySelector('.accordion-content').textContent.toLowerCase();
            
            if (header.includes(searchTerm) || content.includes(searchTerm)) {
                item.style.display = 'block';
                highlightSearchTerm(item, searchTerm);
                foundResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show or hide the "No results" message
        const faqQuestions = document.querySelector('.faq-questions');
        if (!foundResults) {
            if (!document.querySelector('.no-results-message')) {
                faqQuestions.appendChild(noResultsMessage);
                
                // Add event listener to the clear search button
                document.getElementById('clearSearchBtn').addEventListener('click', function() {
                    searchInput.value = '';
                    searchClear.classList.remove('visible');
                    resetSearch();
                });
            }
        } else {
            const existingMessage = document.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
        }
        
        // Hide category sections with no visible items
        const categorySections = document.querySelectorAll('.faq-category-section');
        categorySections.forEach(section => {
            const visibleItems = section.querySelectorAll('.accordion-item[style="display: block;"]');
            if (visibleItems.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    }
    
    // Function to highlight search terms
    function highlightSearchTerm(item, searchTerm) {
        const header = item.querySelector('.accordion-header h3');
        const content = item.querySelector('.accordion-content');
        
        // Reset previous highlights
        header.innerHTML = header.textContent;
        content.innerHTML = content.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
        
        // Function to highlight text
        function highlightText(element, term) {
            const regex = new RegExp(`(${term})`, 'gi');
            
            // If element has childNodes that are elements, process them recursively
            if (element.childElementCount > 0) {
                Array.from(element.children).forEach(child => {
                    highlightText(child, term);
                });
            } else {
                // Only replace text in text nodes
                const textNodes = [];
                const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
                let node;
                while(node = walker.nextNode()) {
                    textNodes.push(node);
                }
                
                textNodes.forEach(textNode => {
                    const parent = textNode.parentNode;
                    const newHtml = textNode.textContent.replace(regex, '<mark class="search-highlight">$1</mark>');
                    const newElement = document.createElement('span');
                    newElement.innerHTML = newHtml;
                    
                    while (newElement.firstChild) {
                        parent.insertBefore(newElement.firstChild, textNode);
                    }
                    parent.removeChild(textNode);
                });
            }
        }
        
        // Apply highlighting
        highlightText(header, searchTerm);
        highlightText(content, searchTerm);
    }
    
    // Function to reset search results
    function resetSearch() {
        // Show all accordion items
        accordionItems.forEach(item => {
            item.style.display = 'block';
            
            // Reset highlighted text
            const header = item.querySelector('.accordion-header h3');
            const content = item.querySelector('.accordion-content');
            
            header.innerHTML = header.textContent;
            content.innerHTML = content.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
        });
        
        // Show all category sections
        const categorySections = document.querySelectorAll('.faq-category-section');
        categorySections.forEach(section => {
            section.style.display = 'block';
        });
        
        // Remove "No results" message if it exists
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }
}

// Initialize accordion functionality
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', (event) => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            if (!event.ctrlKey) { // Allow multiple open with Ctrl key
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            }
            
            // Toggle active state
            item.classList.toggle('active');
            
            // Add animation when opening
            if (!isActive) {
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + 'px';
                
                // Scroll item into view if it's not completely visible
                setTimeout(() => {
                    const itemRect = item.getBoundingClientRect();
                    const isVisible = (
                        itemRect.top >= 0 &&
                        itemRect.bottom <= window.innerHeight
                    );
                    
                    if (!isVisible) {
                        item.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }
                }, 300);
            }
        });
    });
}

// Initialize category filters
function initCategoryFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Set active filter
            categoryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const category = filter.getAttribute('data-category');
            
            // Filter accordion items
            accordionItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });
            
            // Hide category sections with no visible items
            const categorySections = document.querySelectorAll('.faq-category-section');
            categorySections.forEach(section => {
                const visibleItems = section.querySelectorAll('.accordion-item[style="display: block;"]');
                if (visibleItems.length === 0) {
                    section.style.display = 'none';
                } else {
                    section.style.display = 'block';
                }
            });
            
            // Reset search input
            const searchInput = document.getElementById('faqSearch');
            const searchClear = document.getElementById('searchClear');
            if (searchInput && searchClear) {
                searchInput.value = '';
                searchClear.classList.remove('visible');
            }
            
            // Remove "No results" message if it exists
            const existingMessage = document.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
        });
    });
}

// Initialize sidebar navigation
function initSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.faq-category-section');
    
    // Handle click on sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Set active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 100; // Adjust according to your header height
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });
        
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize Back to Top button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add styles to highlight search terms
const style = document.createElement('style');
style.textContent = `
    mark.search-highlight {
        background-color: rgba(58, 134, 255, 0.2);
        color: inherit;
        padding: 2px 0;
        border-radius: 2px;
    }
    
    .no-results-message {
        text-align: center;
        padding: 3rem 0;
    }
    
    .no-results-content {
        max-width: 400px;
        margin: 0 auto;
    }
    
    .no-results-message i {
        font-size: 3rem;
        color: #e9ecef;
        margin-bottom: 1rem;
    }
    
    .no-results-message h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: #343a40;
    }
    
    .no-results-message p {
        color: #6c757d;
        margin-bottom: 1.5rem;
    }
    
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--faq-gradient-start), var(--faq-gradient-end));
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        border: none;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }
    
    .back-to-top.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .back-to-top:hover {
        transform: translateY(-5px);
    }
`;

document.head.appendChild(style);