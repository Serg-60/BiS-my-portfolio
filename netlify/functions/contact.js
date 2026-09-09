/**
 * ============================================
 * NETLIFY FUNCTION: CONTACT FORM
 * ============================================
 * Secure Telegram integration
 * Email validation, HTML escaping, anti-spam
 */

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
 * Валідація даних на серверу
 */
function validateData(data) {
    const errors = [];

    // Перевірка на наявність полів
    if (!data.name || typeof data.name !== 'string') {
        errors.push('Invalid name');
    } else if (data.name.trim().length < 2 || data.name.length > 100) {
        errors.push('Name length invalid');
    }

    if (!data.email || typeof data.email !== 'string') {
        errors.push('Invalid email');
    } else if (!isValidEmail(data.email) || data.email.length > 255) {
        errors.push('Email invalid');
    }

    if (!data.message || typeof data.message !== 'string') {
        errors.push('Invalid message');
    } else if (data.message.trim().length < 10 || data.message.length > 5000) {
        errors.push('Message length invalid');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Відправка в Telegram
 */
async function sendTelegramMessage(token, chatId, name, email, message) {
    try {
        // Очищення даних для безпеки
        const safeName = escapeHtml(name.trim());
        const safeEmail = escapeHtml(email.trim());
        const safeMessage = escapeHtml(message.trim());

        // Форматування повідомлення
        const telegramMessage = `
🚀 <b>Новое сообщение с портфолио!</b>

👤 <b>Имя:</b> ${safeName}
📧 <b>Email:</b> ${safeEmail}

💬 <b>Сообщение:</b>
${safeMessage}

🕐 <b>Время:</b> ${new Date().toLocaleString('uk-UA')}
        `.trim();

        // Відправка API запиту
        const response = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage,
                    parse_mode: 'HTML'
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.status}`);
        }

        const result = await response.json();
        return {
            success: result.ok === true,
            message: 'Message sent to Telegram'
        };

    } catch (error) {
        console.error('Telegram error:', error);
        return {
            success: false,
            message: 'Failed to send to Telegram'
        };
    }
}

/**
 * Netlify Function Handler
 */
exports.handler = async (event, context) => {
    // Перевірка HTTP method
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ 
                success: false,
                message: 'Method not allowed' 
            })
        };
    }

    try {
        // Парсинг JSON тіла
        let data;
        try {
            data = JSON.parse(event.body);
        } catch (e) {
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    success: false,
                    message: 'Invalid JSON' 
                })
            };
        }

        // Серверна валідація
        const validation = validateData(data);
        if (!validation.isValid) {
            console.warn('Validation failed:', validation.errors);
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    success: false,
                    message: 'Validation failed' 
                })
            };
        }

        // Отримання секретів із Environment Variables
        const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
        const telegramChatId = process.env.TELEGRAM_CHAT_ID;

        // Перевірка наявності токенів
        if (!telegramToken || !telegramChatId) {
            console.error('Missing Telegram credentials');
            return {
                statusCode: 500,
                body: JSON.stringify({ 
                    success: false,
                    message: 'Server configuration error' 
                })
            };
        }

        // Відправка в Telegram
        const telegramResult = await sendTelegramMessage(
            telegramToken,
            telegramChatId,
            data.name,
            data.email,
            data.message
        );

        // Відповідь frontend
        if (telegramResult.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ 
                    success: true,
                    message: 'Message received' 
                })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ 
                    success: false,
                    message: 'Failed to send message' 
                })
            };
        }

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                success: false,
                message: 'Server error' 
            })
        };
    }
};