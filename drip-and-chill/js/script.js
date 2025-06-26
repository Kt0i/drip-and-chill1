// Ожидаем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Текущий год в футере (с проверкой элемента)
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Бургер-меню (с проверкой элементов)
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
            });
        });
    }

    // Плавный скролл для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Фиксированная шапка при скролле
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.padding = '15px 0';
            } else {
                header.style.boxShadow = 'none';
                header.style.padding = '25px 0';
            }
        });
    }

    // Обработчик формы (убедитесь, что у вас только одна форма)
    const orderForm = document.getElementById('orderForm') || document.querySelector('.order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Для безопасности лучше получать эти данные с сервера
            const botToken = '7540879502:AAHwXlipdBICEEsrzID9OLZynJUO49uN3fg';
    const chatId = '5890544728';
    
    // Формируем понятное сообщение
    const formData = new FormData(this);
    let message = '🛎️ <b>Новый заказ!</b>\n\n';
    
    // Преобразуем названия полей
    const fieldNames = {
        name: '👤 Имя',
        phone: '📞 Телефон',
        product: '☕ Товар',
        address: '🏠 Адрес',
        comments: '💬 Комментарий'
    };
    
    // Собираем данные
    for (let [key, value] of formData.entries()) {
        const displayName = fieldNames[key] || key;
        message += `${displayName}: <code>${value || 'не указано'}</code>\n`;
    }
    
    // Добавляем дату и время
    message += `\n⏱️ <i>${new Date().toLocaleString()}</i>`;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML' // Используем HTML вместо Markdown
            })
        });
        
        if (!response.ok) throw new Error('Ошибка Telegram API');
        
        alert('✅ Заказ принят! Мы скоро свяжемся с вами.');
        this.reset();
    } catch (error) {
        console.error('Ошибка:', error);
        alert('⚠️ Ошибка отправки. Позвоните нам: +7 XXX XXX-XX-XX');
    }
});

    }
});