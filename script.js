/**
 * Portfolio Website - JavaScript
 * Функціональність: меню, валідація форми, smooth scroll, lazy loading
 */(function () {
  "use strict";

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Перемикання мобільного меню
 */
function toggleMenu() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Закриття меню при кліку на посилання
 */
function closeMenu() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
}

menuToggle.addEventListener('click', toggleMenu);

navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================

const header = document.getElementById('header');

/**
 * Додавання стилю при прокручуванні сторінки
 */
function handleHeaderScroll() {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

/**
 * Валідація email адреси
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Показ помилки поля
 */
function showFieldError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

/**
 * Приховування помилки поля
 */
function hideFieldError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

/**
 * Валідація форми перед відправкою
 */
function validateForm() {
    let isValid = true;

    // Перевірка імені
    if (nameInput.value.trim() === '') {
        showFieldError(nameInput, document.getElementById('nameError'), 'Будь ласка, введіть ваше ім\'я');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showFieldError(nameInput, document.getElementById('nameError'), 'Ім\'я повинно мати мінімум 2 символи');
        isValid = false;
    } else {
        hideFieldError(nameInput, document.getElementById('nameError'));
    }

    // Перевірка email
    if (emailInput.value.trim() === '') {
        showFieldError(emailInput, document.getElementById('emailError'), 'Будь ласка, введіть вашу email');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showFieldError(emailInput, document.getElementById('emailError'), 'Будь ласка, введіть коректну email');
        isValid = false;
    } else {
        hideFieldError(emailInput, document.getElementById('emailError'));
    }

    // Перевірка повідомлення
    if (messageInput.value.trim() === '') {
        showFieldError(messageInput, document.getElementById('messageError'), 'Будь ласка, введіть повідомлення');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showFieldError(messageInput, document.getElementById('messageError'), 'Повідомлення повинно мати мінімум 10 символів');
        isValid = false;
    } else {
        hideFieldError(messageInput, document.getElementById('messageError'));
    }

    return isValid;
}

/**
 * Обработка відправки форми
 */
function handleFormSubmit(e) {
    e.preventDefault();

    // Очищення попередніх повідомлень
    formMessage.textContent = '';
    formMessage.classList.remove('success', 'error');

    if (validateForm()) {
        // Формування даних для відправки
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };

        // Можна замінити на реальний endpoint (напр. Formspree, EmailJS)
        console.log('Form Data:', formData);

        // Симуляція успішної відправки
        formMessage.textContent = 'Дякую! Я отримав ваше повідомлення та перезвоню вам найближчим часом.';
        formMessage.classList.add('success');

        // Очищення форми
        contactForm.reset();

        // Приховування повідомлення через 5 секунд
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.classList.remove('success');
        }, 5000);
    }
}

contactForm.addEventListener('submit', handleFormSubmit);

// Очищення помилок при вводі
nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
        hideFieldError(nameInput, document.getElementById('nameError'));
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        hideFieldError(emailInput, document.getElementById('emailError'));
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
        hideFieldError(messageInput, document.getElementById('messageError'));
    }
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

/**
 * Ініціалізація Intersection Observer для lazy loading
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Зображення вже завантажене (SVG через data URI)
                // Але можемо додати анімацію завантаження
                img.style.animation = 'fadeIn 0.5s ease-in';
                observer.unobserve(img);
            }
        });
    });

    // Спостереження за всіма зображеннями
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        imageObserver.observe(img);
    });
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

/**
 * Smooth scroll при кліку на посилання якорів
 */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Пропускаємо меню-кнопку
        if (href === '#' || href === '') return;

        e.preventDefault();

        const target = document.querySelector(href);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

/**
 * Анімація елементів при прокручуванні
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Спостереження за карточками проектів
document.querySelectorAll('.project-card, .skill-card, .service-card').forEach((card) => {
    observer.observe(card);
});

// ============================================
// DARK MODE TOGGLE (Optional)
// ============================================

/**
 * Перевірка налаштувань системи для dark mode
 */
function initializeDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Ініціалізація при завантаженні сторінки
initializeDarkMode();

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Логування часу завантаження сторінки
 */
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

    console.log(`Page Load Time: ${pageLoadTime}ms`);
});

// ============================================
// ACCESSIBILITY FEATURES
// ============================================

/**
 * Підтримка навігації клавіатурою
 */
document.addEventListener('keydown', (e) => {
    // Escape для закриття мобільного меню
    if (e.key === 'Escape') {
        closeMenu();
    }

    // Alt + M для переходу до меню
    if (e.altKey && e.key === 'm') {
        navMenu.focus();
    }
});

// ============================================
// DOCUMENT READY
// ============================================

/**
 * Ініціалізація при завантаженні DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully');

    // Додання класу active на поточне посилання навігації
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Функція для копіювання тексту в буфер обміну
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
    }).catch(() => {
        console.error('Failed to copy');
    });
}

/**
 * Функція для відправки даних на сервер (якщо потрібно)
 * Замініть URL та додайте реальний бекенд
 */
async function submitFormToServer(formData) {
    try {
        // Приклад з Formspree або EmailJS
        // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // });

        // if (response.ok) {
        //     return { success: true };
        // } else {
        //     return { success: false, error: 'Failed to submit form' };
        // }

        console.log('Form submission ready. Add your backend endpoint here.');
        return { success: true };
    } catch (error) {
        console.error('Form submission error:', error);
        return { success: false, error: error.message };
    }
}
})();

// ============================================
// END OF SCRIPT
// ============================================