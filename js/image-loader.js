/**
 * Energenius Image Loader Utility
 * 
 * This utility provides advanced image loading functionality including:
 * - Lazy loading for performance optimization
 * - WebP format with fallback to JPG/PNG
 * - Image preloading capabilities
 * - Responsive image handling
 * - Placeholder handling
 */

class ImageLoader {
    constructor() {
        // Track loaded images to avoid duplicate loading
        this.loadedImages = new Set();
        
        // Check for WebP support
        this.supportsWebP = this._checkWebPSupport();
        
        // Image directory paths
        this.paths = {
            hero: 'assets/images/hero/',
            features: 'assets/images/features/',
            team: 'assets/images/team/',
            testimonials: 'assets/images/testimonials/',
            backgrounds: 'assets/images/backgrounds/',
            icons: 'assets/images/icons/'
        };
        
        // Initialize observer for lazy loading
        this._initLazyLoading();
    }
    
    /**
     * Check if the browser supports WebP format
     * @private
     * @returns {Promise<boolean>} True if WebP is supported
     */
    _checkWebPSupport() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = () => resolve(true);
            webP.onerror = () => resolve(false);
            webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
        });
    }
    
    /**
     * Initialize lazy loading functionality
     * @private
     */
    _initLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.lazyLoadObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        const srcset = img.getAttribute('data-srcset');
                        
                        if (src) img.src = src;
                        if (srcset) img.srcset = srcset;
                        
                        img.classList.add('loaded');
                        this.loadedImages.add(src);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '0px 0px 200px 0px' // Load images when they're 200px from viewport
            });
        }
    }
    
    /**
     * Get appropriate image path based on WebP support
     * @param {string} imagePath - Base image path without extension
     * @param {string} fallbackExt - Fallback extension if WebP not supported
     * @returns {Promise<string>} Full image path with appropriate extension
     */
    async getImagePath(imagePath, fallbackExt = 'png') {
        const hasWebP = await this.supportsWebP;
        const ext = hasWebP ? 'webp' : fallbackExt;
        return `${imagePath}.${ext}`;
    }
    
    /**
     * Load an image and track it
     * @param {string} src - Image source path
     * @returns {Promise<HTMLImageElement>} Loaded image element
     */
    loadImage(src) {
        return new Promise((resolve, reject) => {
            if (this.loadedImages.has(src)) {
                resolve(null); // Already loaded
                return;
            }
            
            const img = new Image();
            img.onload = () => {
                this.loadedImages.add(src);
                resolve(img);
            };
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    }
    
    /**
     * Preload a set of images
     * @param {Array<string>} sources - Array of image sources
     * @returns {Promise<Array>} Promise that resolves when all images are loaded
     */
    preloadImages(sources) {
        return Promise.all(sources.map(src => this.loadImage(src)));
    }
    
    /**
     * Apply lazy loading to images on the page
     */
    applyLazyLoading() {
        if (!this.lazyLoadObserver) return;
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.lazyLoadObserver.observe(img);
        });
    }
    
    /**
     * Create an image element with lazy loading
     * @param {Object} options - Image options
     * @param {string} options.src - Image source
     * @param {string} options.alt - Alt text
     * @param {string} options.className - CSS class names
     * @param {boolean} options.lazy - Whether to lazy load
     * @returns {HTMLImageElement} Image element
     */
    createImage({ src, alt = '', className = '', lazy = true }) {
        const img = document.createElement('img');
        img.alt = alt;
        
        if (className) {
            img.className = className;
        }
        
        if (lazy) {
            img.setAttribute('data-src', src);
            img.src = 'assets/images/placeholder.svg'; // Placeholder image
            if (this.lazyLoadObserver) {
                this.lazyLoadObserver.observe(img);
            }
        } else {
            img.src = src;
            this.loadedImages.add(src);
        }
        
        return img;
    }
    
    /**
     * Set background image with lazy loading
     * @param {HTMLElement} element - Element to set background on
     * @param {string} src - Image source
     * @param {boolean} lazy - Whether to lazy load
     */
    setBackgroundImage(element, src, lazy = true) {
        if (lazy) {
            element.setAttribute('data-bg', src);
            
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const el = entry.target;
                            const bg = el.getAttribute('data-bg');
                            el.style.backgroundImage = `url(${bg})`;
                            this.loadedImages.add(bg);
                            observer.unobserve(el);
                        }
                    });
                }, {
                    rootMargin: '0px 0px 200px 0px'
                });
                
                observer.observe(element);
            } else {
                // Fallback for browsers without IntersectionObserver
                element.style.backgroundImage = `url(${src})`;
                this.loadedImages.add(src);
            }
        } else {
            element.style.backgroundImage = `url(${src})`;
            this.loadedImages.add(src);
        }
    }
    
    /**
     * Generate srcset for responsive images
     * @param {string} basePath - Base image path without extension
     * @param {Array<number>} sizes - Array of image widths
     * @param {string} ext - Image extension
     * @returns {string} srcset attribute string
     */
    generateSrcset(basePath, sizes, ext = 'webp') {
        return sizes
            .map(size => `${basePath}-${size}.${ext} ${size}w`)
            .join(', ');
    }
}

// Initialize and export
const imageLoader = new ImageLoader();
export default imageLoader; 