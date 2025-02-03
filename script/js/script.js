// Modern JavaScript with better organization and smooth animations
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeSearch();
    initializeScrollEffects();
    initializeFormValidation();
    initializeBookFeatures();
    initializeBookCovers();
});

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


// Handle book cover images
function initializeBookCovers() {
    const bookCovers = document.querySelectorAll('.book-cover');

    bookCovers.forEach(cover => {
        cover.addEventListener('error', function () {
            this.src = '';
            this.classList.add('default-cover');

            // Create default cover content
            this.innerHTML = `
                <i class="fas fa-book default-cover-icon"></i>
            `;
        });
    });
}

   // Mobile Menu Toggle
   const menuToggle = document.querySelector('.menu-toggle');
   const navLinks = document.querySelector('.nav-links');

   menuToggle.addEventListener('click', () => {
       navLinks.classList.toggle('show-mobile');
   });

   // Close mobile menu when clicking outside
   document.addEventListener('click', (e) => {
       if (!e.target.closest('.nav-container')) {
           navLinks.classList.remove('show-mobile');
       }
   });

   // Back to Top Button
   const backToTopButton = document.getElementById('back-to-top');

   window.addEventListener('scroll', () => {
       if (window.pageYOffset > 300) {
           backToTopButton.style.display = 'block';
       } else {
           backToTopButton.style.display = 'none';
       }
   });

   backToTopButton.addEventListener('click', () => {
       window.scrollTo({
           top: 0,
           behavior: 'smooth'
       });
   });

   // Close mobile menu when clicking a link
   document.querySelectorAll('.nav-links a').forEach(link => {
       link.addEventListener('click', () => {
           navLinks.classList.remove('show-mobile');
       });
   });





