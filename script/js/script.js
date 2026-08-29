// Modern JavaScript with better organization and smooth animations
document.addEventListener('DOMContentLoaded', () => {
    initializePreloader();
    initializeNavigation();
    initializeSearch();
    initializeScrollEffects();
    initializeScrollReveal();
    initializeParallax();
    initializeFormValidation();
    initializeBookFeatures();
    initializeBookCovers();
    initializeBackToTop();
    initializeShareButtons();
    initializeBookletShareButtons();
    initializeDarkMode();
    initializeScrollProgress();
    initializeCopyButtons();
});

// Preloader
function initializePreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 500);
    });

    // Fallback - hide preloader after 3 seconds max
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.classList.add('loaded');
        }
    }, 3000);
}

// Scroll Reveal Animations
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing after revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Parallax Effect
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    if (parallaxElements.length === 0) return;

    // Only apply parallax on larger screens
    if (window.innerWidth <= 768) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.backgroundPositionY = `${scrolled * speed}px`;
        });
    }, { passive: true });
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('.nav-links');

    // Mobile menu toggle with smooth animation
    if (mobileMenuButton && nav) {
        mobileMenuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                nav.style.maxHeight = nav.scrollHeight + 'px';
            } else {
                nav.style.maxHeight = '0';
            }
        });
    }
}

// Enhanced search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    let debounceTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            const searchableElements = document.querySelectorAll('.searchable');

            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                const parent = element.closest('.card, .content-block');

                if (!searchTerm) {
                    if (parent) {
                        parent.style.opacity = '1';
                        parent.style.transform = 'scale(1)';
                    }
                    return;
                }

                if (text.includes(searchTerm)) {
                    if (parent) {
                        parent.style.opacity = '1';
                        parent.style.transform = 'scale(1)';
                    }
                    highlightText(element, searchTerm);
                } else if (parent) {
                    parent.style.opacity = '0.5';
                    parent.style.transform = 'scale(0.95)';
                }
            });
        }, 300);
    });
}

// Scroll effects for better UX
function initializeScrollEffects() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('input', () => validateInput(input));
            input.addEventListener('blur', () => validateInput(input));
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                showSuccessMessage(form);
                form.reset();
            }
        });
    });
}

// Helper functions
function validateInput(input) {
    const value = input.value.trim();
    const errorElement = input.nextElementSibling;

    if (!value) {
        showError(input, 'This field is required');
        return false;
    }

    if (input.type === 'email' && !isValidEmail(value)) {
        showError(input, 'Please enter a valid email address');
        return false;
    }

    clearError(input);
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement?.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('error');
    }
}

function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement?.classList.contains('error-message')) {
        errorElement.style.display = 'none';
        input.classList.remove('error');
    }
}

function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Form submitted successfully!';

    form.appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Highlight search results
function highlightText(element, searchTerm) {
    const originalText = element.textContent;
    const regex = new RegExp(searchTerm, 'gi');
    const highlightedText = originalText.replace(regex, match =>
        `<span class="highlight">${match}</span>`
    );
    element.innerHTML = highlightedText;
}

// Book search and filter functionality
function initializeBookFeatures() {
    const searchInput = document.getElementById('bookSearch');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const bookCards = document.querySelectorAll('.book-card');
    const filterResults = document.querySelector('.filter-results');
    const activeCategory = document.querySelector('.active-category');
    const totalResults = document.querySelector('.total-results');
    const resetButton = document.querySelector('.reset-filters');

    if (!searchInput) return;

    // Make filterBooks function available globally
    window.filterBooks = filterBooks;

    // Initialize category counts
    updateCategoryCounts();

    // Add reset functionality
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            searchInput.value = '';
            const allCategoryBtn = document.querySelector('[data-category="all"]');
            if (allCategoryBtn) {
                allCategoryBtn.click();
            }
        });
    }

    function updateCategoryCounts() {
        const categoryCounts = {};
        bookCards.forEach(card => {
            const tags = Array.from(card.querySelectorAll('.category-tag'))
                .map(tag => tag.textContent.toLowerCase().trim());
            tags.forEach(tag => {
                categoryCounts[tag] = (categoryCounts[tag] || 0) + 1;
            });
        });

        // Update category buttons with counts
        categoryButtons.forEach(button => {
            const category = button.dataset.category;
            if (category !== 'all') {
                const count = categoryCounts[category] || 0;
                const countSpan = document.createElement('span');
                countSpan.className = 'count';
                countSpan.textContent = count;
                button.appendChild(countSpan);
            }
        });
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterBooks(searchTerm, getCurrentCategory());
    });

    // Category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active class
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter books
            const category = button.dataset.category;
            const searchTerm = searchInput.value.toLowerCase();
            filterBooks(searchTerm, category);
        });
    });

    function getCurrentCategory() {
        const activeButton = document.querySelector('.category-btn.active');
        return activeButton ? activeButton.dataset.category : 'all';
    }

    function filterBooks(searchTerm, category) {
        // Add updating animation
        if (filterResults) {
            filterResults.classList.add('updating');
        }

        let visibleCount = 0;
        // Count books with matching category before filtering
        const matchingBooks = Array.from(bookCards).filter(card =>
            Array.from(card.querySelectorAll('.category-tag'))
                .map(tag => tag.textContent.toLowerCase().trim())
                .includes(category)
        );

        bookCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const categoryTags = Array.from(card.querySelectorAll('.category-tag'))
                .map(tag => tag.textContent.toLowerCase().trim());

            const matchesSearch = !searchTerm ||
                title.includes(searchTerm) ||
                description.includes(searchTerm);

            const matchesCategory = category === 'all' || categoryTags.includes(category);

            if (matchesSearch && matchesCategory) {
                // Remove any hiding styles
                card.classList.remove('hidden');
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                visibleCount++;
            } else {
                // Add hiding styles
                card.classList.add('hidden');
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
            }
        });

        // Update UI
        setTimeout(() => {
            if (filterResults) {
                filterResults.classList.remove('updating');
            }
            if (activeCategory) {
                activeCategory.textContent = category === 'all' ? 'All Categories' :
                    category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
            }
            if (totalResults) {
                totalResults.textContent = `Total Books: ${visibleCount}`;
            }

            const resultsCount = document.querySelector('.results-count');
            if (resultsCount) {
                resultsCount.textContent = `Showing ${visibleCount} book${visibleCount !== 1 ? 's' : ''}`;
            }

            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
            }
        }, 300);

        // Update results count (you'd need to add this element to your HTML)
        const resultsCount = document.querySelector('.results-count');
        if (resultsCount) {
            resultsCount.textContent = `Showing ${visibleCount} book${visibleCount !== 1 ? 's' : ''}`;
        }

        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }
}


// Handle book cover images with skeleton loading
function initializeBookCovers() {
    const bookCovers = document.querySelectorAll('.book-cover');
    const placeholderPath = window.location.pathname.includes('/pages/')
        ? '../images/books/book-placeholder.svg'
        : 'images/books/book-placeholder.svg';

    bookCovers.forEach(cover => {
        // Wrap cover in skeleton wrapper if not already wrapped
        if (!cover.parentElement.classList.contains('book-cover-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'book-cover-wrapper';
            cover.parentNode.insertBefore(wrapper, cover);
            wrapper.appendChild(cover);
        }

        const wrapper = cover.parentElement;

        // Handle successful load
        cover.addEventListener('load', function() {
            this.classList.add('loaded');
            wrapper.classList.add('loaded');
        });

        // Handle error
        cover.addEventListener('error', function () {
            if (!this.src.includes('book-placeholder.svg')) {
                this.src = placeholderPath;
            }
            this.classList.add('loaded');
            wrapper.classList.add('loaded');
        });

        // If already loaded (cached), mark as loaded
        if (cover.complete && cover.naturalHeight !== 0) {
            cover.classList.add('loaded');
            wrapper.classList.add('loaded');
        }
    });
}

// Mobile Menu JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle menu
    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        // Toggle menu icon
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});

// Share Buttons for Book Cards
function initializeShareButtons() {
    const bookCards = document.querySelectorAll('.book-card');
    if (bookCards.length === 0) return;

    bookCards.forEach(card => {
        const bookDetails = card.querySelector('.book-details');
        const readButton = bookDetails.querySelector('.button');
        const bookTitle = card.querySelector('h2')?.textContent || 'Check out this book';
        const bookLink = readButton?.href || window.location.href;

        // Create share button container
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'book-actions';

        // Move the read button into the actions div
        if (readButton) {
            actionsDiv.appendChild(readButton);
        }

        // Create share button
        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.setAttribute('aria-label', 'Share this book');
        shareBtn.innerHTML = `
            <i class="fas fa-share-alt"></i>
            <div class="share-dropdown">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(bookLink)}" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-facebook"></i> Facebook
                </a>
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(bookTitle)}&url=${encodeURIComponent(bookLink)}" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-twitter"></i> Twitter
                </a>
                <a href="https://wa.me/?text=${encodeURIComponent(bookTitle + ' ' + bookLink)}" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
                <a href="#" class="copy-link" data-link="${bookLink}">
                    <i class="fas fa-link"></i> Copy Link
                </a>
            </div>
        `;

        actionsDiv.appendChild(shareBtn);
        bookDetails.appendChild(actionsDiv);

        // Handle copy link
        const copyLink = shareBtn.querySelector('.copy-link');
        copyLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(bookLink).then(() => {
                const originalText = copyLink.innerHTML;
                copyLink.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyLink.innerHTML = originalText;
                }, 2000);
            });
        });
    });
}

// Share Buttons for Booklet Cards
function initializeBookletShareButtons() {
    const bookletCards = document.querySelectorAll('.booklet-card');
    if (bookletCards.length === 0) return;

    bookletCards.forEach((card, index) => {
        const actionsDiv = card.querySelector('.booklet-actions');
        if (!actionsDiv) return;

        const bookletTitle = card.querySelector('h2')?.textContent || 'Check out this booklet';
        const bookletLink = window.location.origin + window.location.pathname + '#booklet-' + (index + 1);

        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.setAttribute('aria-label', 'Share this booklet');
        shareBtn.innerHTML = `
            <i class="fas fa-share-alt"></i>
            <div class="share-dropdown">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(bookletLink)}" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-facebook"></i> Facebook
                </a>
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(bookletTitle + ' — Mission for Yeshua')}&url=${encodeURIComponent(bookletLink)}" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-twitter"></i> Twitter
                </a>
                <a href="https://wa.me/?text=${encodeURIComponent(bookletTitle + ' — Mission for Yeshua ' + bookletLink)}" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
                <a href="#" class="copy-link" data-link="${bookletLink}">
                    <i class="fas fa-link"></i> Copy Link
                </a>
            </div>
        `;

        actionsDiv.appendChild(shareBtn);

        const copyLink = shareBtn.querySelector('.copy-link');
        copyLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(bookletLink).then(() => {
                const originalText = copyLink.innerHTML;
                copyLink.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyLink.innerHTML = originalText;
                }, 2000);
            });
        });
    });
}

// Dark Mode Toggle
function initializeDarkMode() {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
    }

    // Create dark mode toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'dark-mode-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    toggleBtn.innerHTML = document.body.classList.contains('dark-mode')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

    document.body.appendChild(toggleBtn);

    // Toggle dark mode on click
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');

        // Update icon
        toggleBtn.innerHTML = isDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Animate the toggle
        toggleBtn.style.transform = 'scale(1.2) rotate(180deg)';
        setTimeout(() => {
            toggleBtn.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
}

// Back to Top Button functionality
function initializeBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    const floatingContact = document.querySelector('.floating-contact');
    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
            // Shift contact button to the left when back-to-top appears
            if (floatingContact) {
                floatingContact.classList.add('shifted');
            }
        } else {
            backToTopButton.classList.remove('visible');
            // Move contact button back to original position
            if (floatingContact) {
                floatingContact.classList.remove('shifted');
            }
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Progress Bar
function initializeScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        progressBar.style.width = `${scrollPercent}%`;

        // Add active class for glow effect when scrolling
        if (scrollPercent > 0 && scrollPercent < 100) {
            progressBar.classList.add('active');
        } else {
            progressBar.classList.remove('active');
        }
    }, { passive: true });
}






// Copy-to-clipboard buttons (e.g. banking details on the community center page)
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    if (!copyButtons.length) return;

    const copyText = (text) => {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }

        // Fallback for browsers/contexts without the async clipboard API
        return new Promise((resolve, reject) => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();

            try {
                document.execCommand('copy') ? resolve() : reject();
            } catch (err) {
                reject(err);
            } finally {
                document.body.removeChild(textarea);
            }
        });
    };

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            copyText(button.dataset.copy).then(() => {
                const originalHTML = button.innerHTML;
                const originalLabel = button.getAttribute('aria-label');

                button.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
                button.classList.add('copied');
                button.setAttribute('aria-label', 'Copied');

                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('copied');
                    button.setAttribute('aria-label', originalLabel);
                }, 2000);
            }).catch(() => {
                // Clipboard unavailable - the value stays visible on the page
            });
        });
    });
}
