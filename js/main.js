// ========================================
// Main JavaScript - Navigation & Global Functions
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
});

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Set active state based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === '#home')) {
            link.classList.add('active');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : '';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : '';
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 968) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });
    });
    
    // Active link on scroll (only for hash links on current page)
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Only update active state for hash links
            if (href && href.startsWith('#')) {
                link.classList.remove('active');
                const sectionId = href.substring(1);
                if (sectionId === current) {
                    link.classList.add('active');
                }
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = '#ffffff';
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.feature-card, .class-card, .membership-card, .review-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease ' + (index * 0.1) + 's';
        observer.observe(el);
    });
}

// Form Validation
function validateForm(formElement) {
    let isValid = true;
    const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        
        if (!input.value.trim()) {
            formGroup.classList.add('error');
            isValid = false;
        } else {
            formGroup.classList.remove('error');
            
            // Email validation
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    formGroup.classList.add('error');
                    isValid = false;
                }
            }
            
            // Phone validation
            if (input.type === 'tel') {
                const phoneRegex = /^[\d\s\+\-\(\)]+$/;
                if (!phoneRegex.test(input.value) || input.value.length < 10) {
                    formGroup.classList.add('error');
                    isValid = false;
                }
            }
        }
    });
    
    return isValid;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Local Storage Helper
const StorageHelper = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage error:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

// Date Formatting
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

// API Mock (Replace with actual API calls)
const API = {
    bookClass: async function(bookingData) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    bookingId: 'VFT' + Date.now(),
                    message: 'Booking confirmed successfully'
                });
            }, 1000);
        });
    },
    
    checkAvailability: async function(classId, date) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    available: Math.floor(Math.random() * 15) + 1,
                    total: 20
                });
            }, 500);
        });
    },
    
    sendReminder: async function(bookingId, method) {
        // Simulate sending SMS/WhatsApp reminder
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 500);
        });
    }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
