document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Apply lazy loading
    if (typeof imageLoader !== 'undefined') {
        imageLoader.applyLazyLoading();
    }

    // Theme toggle handler
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        updateThemeToggleIcon();
        
        themeToggle.addEventListener('click', function() {
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
    
    // Gallery data - enhanced with better images and more details
    const galleryData = [
        {
            id: 1,
            title: 'Smart Home Dashboard',
            description: 'Real-time energy monitoring dashboard for residential use with AI-powered insights',
            image: 'assets/images/gallery/smart-home-dashboard.jpg',
            thumbnail: 'assets/images/gallery/thumbnails/smart-home-dashboard.jpg',
            category: 'residential',
            tags: ['dashboard', 'monitoring', 'ai']
        },
        {
            id: 2,
            title: 'Office Energy Management',
            description: 'Comprehensive energy management system for modern offices with zone control',
            image: 'assets/images/gallery/office-energy.jpg',
            thumbnail: 'assets/images/gallery/thumbnails/office-energy.jpg',
            category: 'commercial',
            tags: ['office', 'zone control', 'management']
        },
        {
            id: 3,
            title: 'Factory Optimization',
            description: 'AI-powered energy optimization for manufacturing plants reducing costs by 30%',
            image: 'assets/images/gallery/factory-optimization.jpg',
            thumbnail: 'assets/images/gallery/thumbnails/factory-optimization.jpg',
            category: 'industrial',
            tags: ['factory', 'optimization', 'ai']
        },
        {
            id: 4,
            title: 'Home Solar Integration',
            description: 'Smart integration of solar panels with home energy systems for maximum efficiency',
            image: 'assets/images/gallery/solar-home.jpg',
            thumbnail: 'assets/images/gallery/thumbnails/solar-home.jpg',
            category: 'solar',
            tags: ['solar', 'integration', 'home']
        },
        {
            id: 5,
            title: 'Apartment Complex Solution',
            description: 'Multi-unit energy monitoring and management for apartment buildings',
            image: 'assets/images/gallery/apartment-complex.jpg',
            thumbnail: 'assets/images/gallery/thumbnails/apartment-complex.jpg',
            category: 'residential',
            tags: ['apartment', 'multi-unit', 'monitoring']
        },
        {
            id: 6,
            title: 'Commercial Solar Array',
            description: 'Large-scale solar energy management for commercial use with predictive maintenance',
            image: 'assets/images/gallery/commercial-solar.jpg',
            thumbnail: 'assets/images/gallery/thumbnails/commercial-solar.jpg',
            category: 'solar',
            tags: ['commercial', 'solar', 'large-scale']
        },
        {
            id: 7,
            title: 'Industrial Power Management',
            description: 'Heavy-duty industrial power management solution for factories and plants',
            image: 'assets/images/gallery/industrial-power.jpg',
            thumbnail: 'assets/images/gallery/thumbnails/industrial-power.jpg',
            category: 'industrial',
            tags: ['industrial', 'power', 'heavy-duty']
        },
        {
            id: 8,
            title: 'Retail Energy Solutions',
            description: 'Custom energy management for retail spaces with lighting and climate control',
            image: 'assets/images/gallery/retail-energy.jpg',
            thumbnail: 'assets/images/gallery/thumbnails/retail-energy.jpg',
            category: 'commercial',
            tags: ['retail', 'lighting', 'climate']
        }
    ];
    
    // Use hero dashboard image as fallback for demo purposes
    const fallbackImage = 'assets/images/hero/hero-dashboard.svg';
    
    // Elements
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryEmpty = document.getElementById('galleryEmpty');
    const galleryLoading = document.getElementById('galleryLoading');
    const filters = document.querySelectorAll('.gallery-filter');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxProgress = document.getElementById('lightboxProgress');
    const lightboxTags = document.getElementById('lightboxTags');
    const layoutButtons = document.querySelectorAll('.layout-btn');
    const searchInput = document.getElementById('gallerySearch');
    
    // State variables
    let currentFilter = 'all';
    let currentImageIndex = 0;
    let currentLayout = 'grid';
    let searchQuery = '';
    
    // Initialize 3D tilt effect with improved settings
    function initTiltEffect() {
        VanillaTilt.init(document.querySelectorAll('.gallery-item'), {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            scale: 1.03,
            perspective: 1000,
            transition: true,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            gyroscope: true
        });
        
        VanillaTilt.init(document.querySelectorAll('.tilt-element'), {
            max: 5,
            speed: 400,
            glare: false
        });
    }
    
    // Generate gallery items with enhanced filtering and searching
    function generateGalleryItems(filterCategory = 'all', search = '') {
        // Show loading spinner
        galleryLoading.style.display = 'flex';
        galleryContainer.style.opacity = '0';
        galleryEmpty.style.display = 'none';
        
        // Simulate loading delay for effect
        setTimeout(() => {
            galleryContainer.innerHTML = '';
            
            // Filter by category and search query
            let filteredData = galleryData;
            
            // Apply category filter
            if (filterCategory !== 'all') {
                filteredData = filteredData.filter(item => item.category === filterCategory);
            }
            
            // Apply search filter if query exists
            if (search.trim() !== '') {
                const searchLower = search.toLowerCase();
                filteredData = filteredData.filter(item => 
                    item.title.toLowerCase().includes(searchLower) || 
                    item.description.toLowerCase().includes(searchLower) ||
                    item.tags.some(tag => tag.toLowerCase().includes(searchLower))
                );
            }
            
            // Show empty state if no items match filter
            if (filteredData.length === 0) {
                galleryEmpty.style.display = 'block';
                galleryContainer.style.display = 'none';
                galleryLoading.style.display = 'none';
                
                // Update empty state message based on filters
                const emptyTitle = document.querySelector('.gallery-empty h3');
                if (emptyTitle) {
                    if (search.trim() !== '') {
                        emptyTitle.textContent = `No results for "${search}"`;
                    } else {
                        emptyTitle.textContent = 'No items found';
                    }
                }
            } else {
                galleryEmpty.style.display = 'none';
                galleryContainer.style.display = 'grid';
                
                // Apply current layout class
                galleryContainer.className = 'gallery-container';
                if (currentLayout === 'masonry') {
                    galleryContainer.classList.add('masonry');
                }
                
                // Generate items with improved animation/staggering
                filteredData.forEach((item, index) => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.setAttribute('data-category', item.category);
                    galleryItem.setAttribute('data-id', item.id);
                    galleryItem.setAttribute('data-aos', 'fade-up');
                    galleryItem.setAttribute('data-aos-delay', `${index * 50}`);
                    
                    // Check if images exist, use thumbnails for grid view and fallback if needed
                    const imageSrc = item.thumbnail || item.image || fallbackImage;
                    
                    // Add tags as data attributes
                    if (item.tags && item.tags.length) {
                        galleryItem.setAttribute('data-tags', item.tags.join(','));
                    }
                    
                    galleryItem.innerHTML = `
                        <div class="gallery-image-container zoom-effect">
                            <img data-src="${imageSrc}" alt="${item.title}" class="img-fluid">
                            <span class="category-badge">${item.category}</span>
                        </div>
                        <div class="gallery-overlay">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            ${item.tags ? `<div class="item-tags">${item.tags.map(tag => `<span class="item-tag">${tag}</span>`).join('')}</div>` : ''}
                        </div>
                        <div class="gallery-actions">
                            <div class="gallery-action-btn view-image" data-id="${item.id}" title="View Full Image">
                                <i class="fas fa-search-plus"></i>
                            </div>
                            <div class="gallery-action-btn share-image" data-id="${item.id}" title="Share">
                                <i class="fas fa-share-alt"></i>
                            </div>
                        </div>
                    `;
                    
                    galleryContainer.appendChild(galleryItem);
                });
                
                // Apply lazy loading to new images
                if (typeof imageLoader !== 'undefined') {
                    imageLoader.applyLazyLoading();
                }
                
                // Attach event listeners to view buttons
                document.querySelectorAll('.view-image').forEach(btn => {
                    btn.addEventListener('click', openLightbox);
                });
                
                // Attach share functionality
                document.querySelectorAll('.share-image').forEach(btn => {
                    btn.addEventListener('click', shareImage);
                });
                
                // Attach click event to gallery items
                document.querySelectorAll('.gallery-item').forEach(item => {
                    item.addEventListener('click', function(e) {
                        // Only open lightbox if not clicking on action buttons
                        if (!e.target.closest('.gallery-action-btn')) {
                            const itemId = parseInt(this.getAttribute('data-id'));
                            openLightboxById(itemId);
                        }
                    });
                });
                
                // Initialize enhanced 3D tilt effect
                initTiltEffect();
                
                // Add hover parallax effect
                initItemParallax();
                
                // Show gallery with animation
                setTimeout(() => {
                    galleryContainer.style.opacity = '1';
                    galleryLoading.style.display = 'none';
                }, 300);
            }
        }, 600); // Simulated loading time
    }
    
    // Share image functionality
    function shareImage(e) {
        e.stopPropagation();
        const itemId = parseInt(this.getAttribute('data-id'));
        const imageData = galleryData.find(item => item.id === itemId);
        
        if (!imageData) return;
        
        // Create a temporary modal for share options
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-modal-header">
                    <h3>Share "${imageData.title}"</h3>
                    <button class="share-modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="share-modal-body">
                    <div class="share-options">
                        <a href="#" class="share-option" data-platform="facebook">
                            <i class="fab fa-facebook-f"></i>
                            <span>Facebook</span>
                        </a>
                        <a href="#" class="share-option" data-platform="twitter">
                            <i class="fab fa-twitter"></i>
                            <span>Twitter</span>
                        </a>
                        <a href="#" class="share-option" data-platform="linkedin">
                            <i class="fab fa-linkedin-in"></i>
                            <span>LinkedIn</span>
                        </a>
                        <a href="#" class="share-option" data-platform="pinterest">
                            <i class="fab fa-pinterest-p"></i>
                            <span>Pinterest</span>
                        </a>
                        <a href="#" class="share-option" data-platform="email">
                            <i class="fas fa-envelope"></i>
                            <span>Email</span>
                        </a>
                        <a href="#" class="share-option" data-platform="link">
                            <i class="fas fa-link"></i>
                            <span>Copy Link</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate modal appearance
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Add event listeners to share options
        modal.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.getAttribute('data-platform');
                
                // Demo functionality - In production would use actual share URLs
                alert(`Sharing via ${platform}. This would open a proper share dialog in production.`);
                
                // Close modal after sharing
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
        });
        
        // Close modal when clicking close button
        const closeBtn = modal.querySelector('.share-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
        }
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    }
    
    // Initialize filter buttons
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Update current filter
            currentFilter = this.getAttribute('data-filter');
            
            // Generate gallery items with current filter
            generateGalleryItems(currentFilter, searchQuery);
            
            // Add ripple effect to button
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Initialize layout toggle buttons
    layoutButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all layout buttons
            layoutButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current layout
            currentLayout = this.getAttribute('data-layout');
            
            // Apply layout
            if (currentLayout === 'masonry') {
                galleryContainer.classList.add('masonry');
            } else {
                galleryContainer.classList.remove('masonry');
            }
        });
    });
    
    // Enhanced parallax effect for gallery items
    function initItemParallax() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate percentage position within the element
                const xPercent = x / rect.width - 0.5;  // -0.5 to 0.5
                const yPercent = y / rect.height - 0.5; // -0.5 to 0.5
                
                // Apply parallax to image
                const image = this.querySelector('img');
                const overlay = this.querySelector('.gallery-overlay');
                const categoryBadge = this.querySelector('.category-badge');
                
                if (image) {
                    image.style.transform = `translate(${xPercent * -15}px, ${yPercent * -15}px) scale(1.1)`;
                }
                
                if (overlay) {
                    overlay.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
                }
                
                if (categoryBadge) {
                    categoryBadge.style.transform = `translate(${xPercent * 5}px, ${yPercent * 5}px)`;
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const image = this.querySelector('img');
                const overlay = this.querySelector('.gallery-overlay');
                const categoryBadge = this.querySelector('.category-badge');
                
                if (image) {
                    image.style.transform = 'translate(0, 0) scale(1)';
                }
                
                if (overlay) {
                    overlay.style.transform = 'translate(0, 0)';
                }
                
                if (categoryBadge) {
                    categoryBadge.style.transform = 'translate(0, 0)';
                }
            });
        });
    }
    
    // Lightbox functionality with enhanced transitions
    function openLightbox(e) {
        e.stopPropagation();
        const itemId = parseInt(this.getAttribute('data-id'));
        openLightboxById(itemId);
    }
    
    function openLightboxById(itemId) {
        const imageData = galleryData.find(item => item.id === itemId);
        
        if (!imageData) return;
        
        // Set current image index
        currentImageIndex = galleryData.indexOf(imageData);
        
        // Preload next and previous images for smoother navigation
        preloadAdjacentImages(currentImageIndex);
        
        // Update lightbox image and info
        updateLightboxContent(imageData);
        
        // Show lightbox with enhanced animation
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.classList.add('active');
            
            // Animate in the image
            lightboxImage.style.opacity = '1';
            lightboxImage.style.transform = 'scale(1) rotate(0deg)';
        }, 10);
        
        // Update progress bar
        updateLightboxProgress();
        
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
    }
    
    function preloadAdjacentImages(currentIndex) {
        // Preload previous image
        if (currentIndex > 0) {
            const prevImage = new Image();
            prevImage.src = galleryData[currentIndex - 1].image || fallbackImage;
        }
        
        // Preload next image
        if (currentIndex < galleryData.length - 1) {
            const nextImage = new Image();
            nextImage.src = galleryData[currentIndex + 1].image || fallbackImage;
        }
    }
    
    function updateLightboxContent(imageData) {
        // Use high-quality image for lightbox
        const imageSrc = imageData.image || fallbackImage;
        
        // Prepare image with loading state
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.9) rotate(-2deg)';
        
        // Update image
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageData.title;
        
        // Update info
        lightboxTitle.textContent = imageData.title;
        lightboxDescription.textContent = imageData.description;
        lightboxCategory.textContent = imageData.category;
        
        // Update tags if available
        if (lightboxTags && imageData.tags && imageData.tags.length) {
            lightboxTags.innerHTML = imageData.tags.map(tag => `<span class="lightbox-tag">${tag}</span>`).join('');
            lightboxTags.style.display = 'flex';
        } else if (lightboxTags) {
            lightboxTags.style.display = 'none';
        }
        
        // Animate in the image once loaded
        lightboxImage.onload = function() {
            lightboxImage.style.opacity = '1';
            lightboxImage.style.transform = 'scale(1) rotate(0deg)';
        };
    }
    
    function updateLightboxProgress() {
        // Get filtered gallery data based on current filter
        const filteredData = currentFilter === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.category === currentFilter);
        
        // Find current image in filtered data
        const currentImageData = galleryData[currentImageIndex];
        const filteredIndex = filteredData.findIndex(item => item.id === currentImageData.id);
        
        // Calculate progress percentage
        const progress = ((filteredIndex + 1) / filteredData.length) * 100;
        lightboxProgress.style.width = `${progress}%`;
    }
    
    function closeLightbox() {
        // Animate out
        lightbox.classList.remove('active');
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.9)';
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    function navigateLightbox(direction) {
        // Get filtered gallery data based on current filter
        const filteredData = currentFilter === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.category === currentFilter);
        
        // Find current image in filtered data
        const currentImageData = galleryData[currentImageIndex];
        const filteredIndex = filteredData.findIndex(item => item.id === currentImageData.id);
        
        // Calculate new index within filtered data
        let newFilteredIndex = filteredIndex + direction;
        
        // Handle wrap-around
        if (newFilteredIndex < 0) newFilteredIndex = filteredData.length - 1;
        if (newFilteredIndex >= filteredData.length) newFilteredIndex = 0;
        
        // Get the new image data and its index in the full gallery data
        const newImageData = filteredData[newFilteredIndex];
        const newFullIndex = galleryData.findIndex(item => item.id === newImageData.id);
        
        // Update current index
        currentImageIndex = newFullIndex;
        
        // Preload next image in sequence for smoother navigation
        preloadAdjacentImages(currentImageIndex);
        
        // Update image with enhanced animation
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = direction > 0 
            ? 'scale(0.9) translateX(5%) rotateY(5deg)' 
            : 'scale(0.9) translateX(-5%) rotateY(-5deg)';
        
        setTimeout(() => {
            // Update lightbox content
            updateLightboxContent(newImageData);
            
            // Update progress bar
            updateLightboxProgress();
        }, 300);
    }
    
    // Attach lightbox event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => navigateLightbox(1));
    }
    
    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    });
    
    // Touch swipe support for lightbox with improved sensitivity
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    if (lightbox) {
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, false);
        
        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        const xDiff = touchEndX - touchStartX;
        const yDiff = touchEndY - touchStartY;
        
        // Only register horizontal swipes (when horizontal movement > vertical movement)
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff < -50) {
                // Swipe left, go to next
                navigateLightbox(1);
            } else if (xDiff > 50) {
                // Swipe right, go to previous
                navigateLightbox(-1);
            }
        }
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value.trim();
            
            // Debounce search by using timeout
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                generateGalleryItems(currentFilter, searchQuery);
            }, 300);
        });
        
        // Clear search button
        const clearSearchBtn = document.getElementById('clearSearch');
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', function() {
                searchInput.value = '';
                searchQuery = '';
                generateGalleryItems(currentFilter, '');
                this.style.display = 'none';
            });
            
            // Show/hide clear button
            searchInput.addEventListener('input', function() {
                clearSearchBtn.style.display = this.value.trim() !== '' ? 'block' : 'none';
            });
        }
    }
    
    // Check for saved theme preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Initialize gallery with default settings
    generateGalleryItems('all', '');
}); 