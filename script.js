// Global Variables
let currentSlide = 0;
let currentTestimonial = 0;
const slides = document.querySelectorAll('.slide');
const slideContents = document.querySelectorAll('.slide-content');
const dots = document.querySelectorAll('.slider-dots .dot');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSlider();
    initializeTestimonials();
    initializeContactForm();
    initializeScrollEffects();
    initializeNewsletterForm();
    initializeCareerPage();
    initializeContactModals();
});

// Navigation Functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Image Slider Functionality
function initializeSlider() {
    if (slides.length === 0) return;

    // Auto-play slider
    setInterval(() => {
        nextSlide();
    }, 6000);

    // Initialize first slide
    showSlide(0);
}

function showSlide(index) {
    // Add fade out effect to current slide
    slides.forEach((slide, i) => {
        if (slide.classList.contains('active')) {
            slide.style.transform = 'scale(1.05)';
        }
    });
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    slideContents.forEach(content => content.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
        // Trigger ken burns effect
        setTimeout(() => {
            slides[index].style.transform = 'scale(1)';
        }, 100);
    }
    if (slideContents[index]) {
        slideContents[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
}

function currentSlideFunc(index) {
    showSlide(index - 1);
}

// Make functions globally available
window.changeSlide = changeSlide;
window.currentSlide = currentSlideFunc;

// Testimonials Functionality
function initializeTestimonials() {
    if (testimonialSlides.length === 0) return;

    // Auto-play testimonials
    setInterval(() => {
        nextTestimonial();
    }, 6000);

    // Initialize first testimonial
    showTestimonial(0);
}

function showTestimonial(index) {
    // Remove active class from all testimonial slides and dots
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current testimonial slide and dot
    if (testimonialSlides[index]) {
        testimonialSlides[index].classList.add('active');
    }
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

function nextTestimonial() {
    const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(nextIndex);
}

function currentTestimonialFunc(index) {
    showTestimonial(index - 1);
}

// Make function globally available
window.currentTestimonial = currentTestimonialFunc;

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateContactForm(data)) {
                // Show success message
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            }
        });
    }
}

function validateContactForm(data) {
    const required = ['firstName', 'lastName', 'email', 'subject', 'message'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

// Contact Modals Functionality
function initializeContactModals() {
    // Initialize consultation form
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(consultationForm);
            const data = Object.fromEntries(formData);
            
            if (validateConsultationForm(data)) {
                showNotification('Consultation scheduled successfully! We\'ll send you a confirmation email shortly.', 'success');
                closeModal('consultationModal');
                consultationForm.reset();
            }
        });
    }

    // Initialize quote form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData);
            
            if (validateQuoteForm(data)) {
                showNotification('Quote request submitted successfully! We\'ll send you a detailed proposal within 24 hours.', 'success');
                closeModal('quoteModal');
                quoteForm.reset();
            }
        });
    }

    // Initialize network form
    const networkForm = document.getElementById('networkForm');
    if (networkForm) {
        networkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(networkForm);
            const data = Object.fromEntries(formData);
            
            if (validateNetworkForm(data)) {
                showNotification('Application submitted successfully! We\'ll review your profile and get back to you soon.', 'success');
                closeModal('networkModal');
                networkForm.reset();
            }
        });
    }

    // Set minimum date for consultation to today
    const consultDateInput = document.getElementById('consultDate');
    if (consultDateInput) {
        const today = new Date().toISOString().split('T')[0];
        consultDateInput.min = today;
    }
}

// Modal control functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Form validation functions
function validateConsultationForm(data) {
    const required = ['consultName', 'consultEmail', 'consultDate', 'consultTime', 'consultTopic'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            const fieldName = field.replace('consult', '').toLowerCase();
            showNotification(`Please fill in the ${fieldName} field.`, 'error');
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.consultEmail)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Validate date is not in the past
    const selectedDate = new Date(data.consultDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Please select a future date for your consultation.', 'error');
        return false;
    }
    
    return true;
}

function validateQuoteForm(data) {
    const required = ['quoteName', 'quoteEmail', 'quoteCompany', 'quoteService', 'quoteDescription'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            const fieldName = field.replace('quote', '').toLowerCase();
            showNotification(`Please fill in the ${fieldName} field.`, 'error');
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.quoteEmail)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

function validateNetworkForm(data) {
    const required = ['networkName', 'networkEmail', 'networkPhone', 'networkLocation', 'networkExperience', 'networkAvailability', 'networkSkills', 'networkSpecialty', 'networkMotivation'];
    
    for (let field of required) {
        if (!data[field] || data[field].toString().trim() === '') {
            const fieldName = field.replace('network', '').toLowerCase();
            showNotification(`Please fill in the ${fieldName} field.`, 'error');
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.networkEmail)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Check if terms are agreed
    if (!data.networkTerms) {
        showNotification('Please agree to the terms and conditions.', 'error');
        return false;
    }
    
    // Check if resume is uploaded
    const resumeInput = document.getElementById('networkResume');
    if (!resumeInput.files || resumeInput.files.length === 0) {
        showNotification('Please upload your resume.', 'error');
        return false;
    }
    
    // Validate file size (5MB max)
    const file = resumeInput.files[0];
    if (file.size > 5 * 1024 * 1024) {
        showNotification('Resume file size must be less than 5MB.', 'error');
        return false;
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        showNotification('Please upload a PDF, DOC, or DOCX file.', 'error');
        return false;
    }
    
    return true;
}

// Newsletter Form Functionality
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-family: 'Montserrat', sans-serif;
    `;
    
    // Type-specific styling
    if (type === 'success') {
        notification.style.background = 'hsl(120, 60%, 90%)';
        notification.style.color = 'hsl(120, 60%, 20%)';
        notification.style.borderLeft = '4px solid hsl(120, 60%, 50%)';
    } else if (type === 'error') {
        notification.style.background = 'hsl(0, 60%, 90%)';
        notification.style.color = 'hsl(0, 60%, 20%)';
        notification.style.borderLeft = '4px solid hsl(0, 60%, 50%)';
    } else {
        notification.style.background = 'hsl(200, 60%, 90%)';
        notification.style.color = 'hsl(200, 60%, 20%)';
        notification.style.borderLeft = '4px solid hsl(200, 60%, 50%)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .team-member, .blog-card, .value-card, .benefit-card').forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based animations or effects here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Focus management for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trapping for mobile menu
const navMenu = document.getElementById('nav-menu');
if (navMenu) {
    trapFocus(navMenu);
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Animated Counter Function
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Initialize Stats Animation
function initializeStatsAnimation() {
    const statsSection = document.querySelector('.company-stats');
    if (!statsSection) return;
    
    const statNumbers = statsSection.querySelectorAll('.stat-number');
    const statCards = statsSection.querySelectorAll('.stat-card');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                // Animate cards first
                statCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, index * 100);
                });
                
                // Then animate numbers
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    setTimeout(() => {
                        animateCounter(stat, target, 2000);
                    }, 300);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(statsSection);
}

// Initialize stats animation when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeStatsAnimation);

// Career Page Functionality
function initializeCareerPage() {
    const applyButtons = document.querySelectorAll('.apply-btn');
    const modal = document.getElementById('applicationModal');
    const closeModal = document.querySelector('.close-modal');
    const applicationForm = document.getElementById('applicationForm');
    const positionInput = document.getElementById('positionApplying');

    if (applyButtons.length > 0 && modal) {
        // Open modal when apply button is clicked
        applyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const jobTitle = this.getAttribute('data-job');
                positionInput.value = jobTitle;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Handle form submission
        if (applicationForm) {
            applicationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(applicationForm);
                const data = Object.fromEntries(formData);
                
                // Validate form
                if (validateApplicationForm(data)) {
                    // Show success message
                    showNotification('Application submitted successfully! We\'ll review your application and get back to you soon.', 'success');
                    
                    // Close modal and reset form
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    applicationForm.reset();
                }
            });
        }
    }

    // View details functionality
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            // This could expand the job card or navigate to a detailed job page
            const jobCard = this.closest('.job-card');
            const requirements = jobCard.querySelector('.job-requirements');
            
            if (requirements.style.display === 'none' || !requirements.style.display) {
                requirements.style.display = 'block';
                this.textContent = 'Hide Details';
            } else {
                requirements.style.display = 'none';
                this.textContent = 'View Details';
            }
        });
    });
}

function validateApplicationForm(data) {
    const required = ['applicantName', 'applicantEmail', 'applicantPhone', 'positionApplying', 'experience', 'coverLetter'];
    
    for (let field of required) {
        if (!data[field] || data[field].toString().trim() === '') {
            const fieldName = field.replace(/([A-Z])/g, ' $1').toLowerCase().replace('applicant ', '');
            showNotification(`Please fill in the ${fieldName} field.`, 'error');
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.applicantEmail)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Check if terms are agreed
    if (!data.agreeTerms) {
        showNotification('Please agree to the terms and conditions.', 'error');
        return false;
    }
    
    // Check if resume is uploaded
    const resumeInput = document.getElementById('resume');
    if (!resumeInput.files || resumeInput.files.length === 0) {
        showNotification('Please upload your resume.', 'error');
        return false;
    }
    
    // Validate file size (5MB max)
    const file = resumeInput.files[0];
    if (file.size > 5 * 1024 * 1024) {
        showNotification('Resume file size must be less than 5MB.', 'error');
        return false;
    }
    
    return true;
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error reporting service
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});