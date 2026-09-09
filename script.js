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
// function handleFormSubmit(e) {
//     e.preventDefault();

//     // Очищення попередніх повідомлень
//     formMessage.textContent = '';
//     formMessage.classList.remove('success', 'error');

//     if (validateForm()) {
//         // Формування даних для відправки
//         const formData = {
//             name: nameInput.value.trim(),
//             email: emailInput.value.trim(),
//             message: messageInput.value.trim(),
//             timestamp: new Date().toISOString()
//         };

//         // Можна замінити на реальний endpoint (напр. Formspree, EmailJS)
//         console.log('Form Data:', formData);

//         // Симуляція успішної відправки
//         formMessage.textContent = 'Дякую! Я отримав ваше повідомлення та перезвоню вам найближчим часом.';
//         formMessage.classList.add('success');

//         // Очищення форми
//         contactForm.reset();

//         // Приховування повідомлення через 5 секунд
//         setTimeout(() => {
//             formMessage.textContent = '';
//             formMessage.classList.remove('success');
//         }, 5000);
//     }
// }



// Очищення помилок при вводі
// // nameInput.addEventListener('input', () => {
//     if (nameInput.classList.contains('error')) {
//         hideFieldError(nameInput, document.getElementById('nameError'));
//     }
// });

// emailInput.addEventListener('input', () => {
//     if (emailInput.classList.contains('error')) {
//         hideFieldError(emailInput, document.getElementById('emailError'));
//     }
// });

// messageInput.addEventListener('input', () => {
//     if (messageInput.classList.contains('error')) {
//         hideFieldError(messageInput, document.getElementById('messageError'));
//     }
// });

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

/**
 * ============================================
 * CONTACT FORM - SECURE SUBMISSION
 * ============================================
 * Frontend validation + Netlify Function + Formspree
 * Telegram token is ONLY in server (Netlify Function)
 */

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('contactName');
const emailInput = document.getElementById('contactEmail');
const messageInput = document.getElementById('contactMessage');
const honeypotInput = document.getElementById('website');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

// Formspree ID (не секретна, безпечна у frontend)
const FORMSPREE_FORM_ID = 'xbgrqyjv';

/**
 * Валідація email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Очищення HTML для безпеки
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Показання помилки поля
 */
function showFieldError(inputElement, errorElement, message) {
    inputElement.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    inputElement.classList.add('error');
}

/**
 * Приховування помилки поля
 */
function hideFieldError(inputElement, errorElement) {
    inputElement.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '';
    inputElement.classList.remove('error');
}

/**
 * Валідація форми на frontend
 */
function validateForm() {
    let isValid = true;

    // Перевірка імені
    const nameValue = nameInput.value.trim();
    const nameError = document.getElementById('nameError');
    
    if (nameValue === '') {
        showFieldError(nameInput, nameError, 'Будь ласка, введіть ваше ім\'я');
        isValid = false;
    } else if (nameValue.length < 2) {
        showFieldError(nameInput, nameError, 'Ім\'я повинно мати мінімум 2 символи');
        isValid = false;
    } else if (nameValue.length > 100) {
        showFieldError(nameInput, nameError, 'Ім\'я занадто довге (макс. 100 символів)');
        isValid = false;
    } else {
        hideFieldError(nameInput, nameError);
    }

    // Перевірка email
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    
    if (emailValue === '') {
        showFieldError(emailInput, emailError, 'Будь ласка, введіть вашу email');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        showFieldError(emailInput, emailError, 'Будь ласка, введіть коректну email');
        isValid = false;
    } else if (emailValue.length > 255) {
        showFieldError(emailInput, emailError, 'Email занадто довгий');
        isValid = false;
    } else {
        hideFieldError(emailInput, emailError);
    }

    // Перевірка повідомлення
    const messageValue = messageInput.value.trim();
    const messageError = document.getElementById('messageError');
    
    if (messageValue === '') {
        showFieldError(messageInput, messageError, 'Будь ласка, введіть повідомлення');
        isValid = false;
    } else if (messageValue.length < 10) {
        showFieldError(messageInput, messageError, 'Повідомлення повинно мати мінімум 10 символів');
        isValid = false;
    } else if (messageValue.length > 5000) {
        showFieldError(messageInput, messageError, 'Повідомлення занадто довге (макс. 5000 символів)');
        isValid = false;
    } else {
        hideFieldError(messageInput, messageError);
    }

    return isValid;
}

/**
 * Очищення помилок при вводі
 */
nameInput.addEventListener('input', () => {
    if (nameInput.getAttribute('aria-invalid') === 'true') {
        hideFieldError(nameInput, document.getElementById('nameError'));
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.getAttribute('aria-invalid') === 'true') {
        hideFieldError(emailInput, document.getElementById('emailError'));
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.getAttribute('aria-invalid') === 'true') {
        hideFieldError(messageInput, document.getElementById('messageError'));
    }
});

/**
 * Відправка на Netlify Function (/api/contact)
 */
async function sendToNetlify(name, email, message) {
    try {
        const response = await fetch('/.netlify/functions/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            success: data.success === true,
            message: data.message || 'Помилка відправки'
        };
    } catch (error) {
        console.error('Netlify Function error:', error);
        return {
            success: false,
            message: 'Помилка з\'єднання'
        };
    }
}

/**
 * Відправка на Formspree (Email)
 */
async function sendToFormspree(name, email, message) {
    try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                _subject: `Новое сообщение от ${name}`,
                _captcha: false
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            success: true,
            message: 'Email надіслано'
        };
    } catch (error) {
        console.error('Formspree error:', error);
        return {
            success: false,
            message: 'Помилка email'
        };
    }
}

/**
 * Обробка відправки форми
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    // Валідація honeypot (анти-спам)
    if (honeypotInput.value !== '') {
        console.warn('Honeypot triggered - spam detected');
        formMessage.textContent = '❌ Форма виглядає невалідною. Спробуйте ще раз.';
        formMessage.className = 'form-message error';
        return;
    }

    // Валідація на frontend
    if (!validateForm()) {
        return;
    }

    // Отримання даних
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Очищення попередніх повідомлень
    formMessage.textContent = '';
    formMessage.className = '';

    // Блокування кнопки
    submitBtn.disabled = true;
    submitBtn.textContent = 'Надсилаю...';
    formMessage.textContent = '📤 Відправка...';
    formMessage.className = 'form-message loading';

    try {
        // Відправка паралельно на обидва канали
        const [netlifyResult, formspreeResult] = await Promise.all([
            sendToNetlify(name, email, message),
            sendToFormspree(name, email, message)
        ]);

        console.log('Netlify result:', netlifyResult);
        console.log('Formspree result:', formspreeResult);

        // Обробка результатів
        if (netlifyResult.success && formspreeResult.success) {
            // Обидва успішні ✅
            formMessage.textContent = '✅ Спасибо! Я отримав ваше повідомлення та перезвоню вам найближчим часом.';
            formMessage.className = 'form-message success';
            contactForm.reset();

        } else if (netlifyResult.success) {
            // Телеграм OK, Email помилка
            formMessage.textContent = '✅ Повідомлення отримано! Email може затримтися.';
            formMessage.className = 'form-message success';
            contactForm.reset();

        } else if (formspreeResult.success) {
            // Email OK, Telegram помилка
            formMessage.textContent = '✅ Email отримано! Telegram сповіщення не надіслано.';
            formMessage.className = 'form-message success';
            contactForm.reset();

        } else {
            // Обидва не працюють
            throw new Error('Обидва канали помилка');
        }

        // Приховування повідомлення через 5 секунд
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 5000);

    } catch (error) {
        console.error('Form submission error:', error);
        formMessage.textContent = '❌ Помилка! Спробуйте ще раз або напишіть мені напряму на email.';
        formMessage.className = 'form-message error';

    } finally {
        // Розблокування кнопки
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

// Підключення слухача до форми
contactForm.addEventListener('submit', handleFormSubmit);

console.log('✅ Contact form script loaded - Netlify + Formspree');