// Модальное окно для дипломов
const modal = document.getElementById('diplomaModal');
const modalImg = document.getElementById('modalImage');
const previewImages = document.querySelectorAll('.diploma-image img');

const originalImages = [];
previewImages.forEach(img => {
    originalImages.push(img.src.replace('-thumb', ''));
});

let currentIndex = 0;

function openModal(index) {
    currentIndex = index;
    modalImg.src = originalImages[currentIndex];
    modal.style.display = 'flex';
    document.querySelector('.modal-close-fixed').focus();
}

function closeModal(event) {
    if (event) event.stopPropagation();
    modal.style.display = 'none';
}

function prevImage(event) {
    event.stopPropagation();
    currentIndex = (currentIndex - 1 + originalImages.length) % originalImages.length;
    modalImg.src = originalImages[currentIndex];
}

function nextImage(event) {
    event.stopPropagation();
    currentIndex = (currentIndex + 1) % originalImages.length;
    modalImg.src = originalImages[currentIndex];
}

previewImages.forEach((img, idx) => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(idx);
    });
});

window.onclick = (event) => {
    if (event.target == modal) {
        closeModal();
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

// Интерактивный выбор времени для Эзиклена
const scheduleData = {
    "7:00":  { steps: ["15:00–16:00", "16:00–17:00", "03:00–04:00", "04:00–05:00"] },
    "8:00":  { steps: ["16:00–17:00", "17:00–18:00", "04:00–05:00", "05:00–06:00"] },
    "9:00":  { steps: ["17:00–18:00", "18:00–19:00", "05:00–06:00", "06:00–07:00"] },
    "10:00": { steps: ["18:00–19:00", "19:00–20:00", "06:00–07:00", "07:00–08:00"] },
    "11:00": { steps: ["19:00–20:00", "20:00–21:00", "07:00–08:00", "08:00–09:00"] },
    "12:00": { steps: ["20:00–21:00", "21:00–22:00", "08:00–09:00", "09:00–10:00"] },
    "13:00": { steps: ["21:00–22:00", "22:00–23:00", "09:00–10:00", "10:00–11:00"] },
    "14:00": { steps: ["06:00–07:00", "07:00–08:00", "10:00–11:00", "11:00–12:00"] },
    "15:00": { steps: ["07:00–08:00", "08:00–09:00", "11:00–12:00", "12:00–13:00"] },
    "16:00": { steps: ["08:00–09:00", "09:00–10:00", "12:00–13:00", "13:00–14:00"] },
    "17:00": { steps: ["09:00–10:00", "10:00–11:00", "13:00–14:00", "14:00–15:00"] },
    "18:00": { steps: ["10:00–11:00", "11:00–12:00", "14:00–15:00", "15:00–16:00"] },
    "19:00": { steps: ["11:00–12:00", "12:00–13:00", "15:00–16:00", "16:00–17:00"] }
};

const timeSelect = document.getElementById('procedure-time');
const outputDiv = document.getElementById('schedule-output');

timeSelect.addEventListener('change', function() {
    const selected = this.value;
    if (!selected) {
        outputDiv.style.display = 'none';
        return;
    }
    const data = scheduleData[selected];
    if (!data) return;

    const procedureHour = parseInt(selected.split(':')[0]);
    const isTwoPhase = procedureHour <= 13;
    const steps = data.steps;

    let html = `<div class="schedule-badge">${isTwoPhase ? 'Двухэтапная схема' : 'Одноэтапная схема'}</div>`;
    html += `<div class="schedule-title"><span class="schedule-text">Ваше расписание, если&nbsp;прием назначен на&nbsp;<span class="time-highlight">${selected}</span></span></div>`;

    if (isTwoPhase) {
        html += `<div class="schedule-stage-title"><i class="fas fa-cloud-moon" aria-hidden="true"></i> Прием первой дозы – день накануне колоноскопии</div>`;
    } else {
        html += `<div class="schedule-stage-title"><i class="fas fa-sun" aria-hidden="true"></i> Прием первой дозы – утром в день колоноскопии</div>`;
    }
    html += `<div class="schedule-step"><div class="step-time">${steps[0]}</div><div class="step-desc">0,5 л раствора Эзиклен® (флакон 176 мл + вода 324 мл) — выпить медленно, в течение 30–60 минут</div></div>`;
    html += `<div class="schedule-step"><div class="step-time">${steps[1]}</div><div class="step-desc">1 л прозрачной жидкости (вода, чай, бульон)</div></div>`;

    if (isTwoPhase) {
        html += `<div class="schedule-night"><i class="fas fa-moon" aria-hidden="true"></i> Ночь</div>`;
        html += `<div class="schedule-stage-title"><i class="fas fa-sun" aria-hidden="true"></i> Прием второй дозы – утром в день колоноскопии</div>`;
    } else {
        html += `<div class="schedule-stage-title"><i class="fas fa-cloud-sun" aria-hidden="true"></i> Прием второй дозы – в день колоноскопии</div>`;
    }

    html += `<div class="schedule-step"><div class="step-time">${steps[2]}</div><div class="step-desc">0,5 л раствора Эзиклен® (флакон 176 мл + вода 324 мл) — выпить медленно, в течение 30–60 минут</div></div>`;
    html += `<div class="schedule-step"><div class="step-time">${steps[3]}</div><div class="step-desc">1 л прозрачной жидкости (вода, чай, бульон)</div></div>`;

    html += `<div class="schedule-night">Ничего не&nbsp;пить и&nbsp;не&nbsp;есть 2&nbsp;часа</div>`;
    html += `<div class="schedule-stage-title"><i class="fas fa-stethoscope" aria-hidden="true"></i> Колоноскопия в ${selected}</div>`;

    outputDiv.innerHTML = html;
    outputDiv.style.display = 'block';
});

// Бургер-меню
const burger = document.querySelector('.burger-menu');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const burgerIcon = document.querySelector('.burger-icon');
const closeIcon = document.querySelector('.close-icon');
const body = document.body;
const menuLinks = document.querySelectorAll('.fullscreen-link');

function toggleMenu() {
    const isActive = fullscreenMenu.classList.contains('active');
    fullscreenMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', !isActive);

    if (fullscreenMenu.classList.contains('active')) {
        burgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        burgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

burger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

burger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (fullscreenMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

fullscreenMenu.addEventListener('click', (e) => {
    if (e.target === fullscreenMenu) {
        toggleMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1159 && fullscreenMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// ========== МОДАЛЬНОЕ ОКНО УВЕДОМЛЕНИЙ ==========
const modalOverlay = document.getElementById('modal-overlay');
const modalWindow = document.getElementById('modal-window');
const modalIcon = document.getElementById('modal-icon');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalActionBtn = document.getElementById('modal-action-btn');

function showModal(type, message) {
    if (type === 'success') {
        modalIcon.innerHTML = '<i class="fas fa-circle-check" style="color: #1d4ed8; font-size: 4rem;" aria-hidden="true"></i>';
    } else {
        modalIcon.innerHTML = '<i class="fas fa-circle-exclamation" style="color: #ef4444; font-size: 4rem;" aria-hidden="true"></i>';
    }

    modalWindow.classList.remove('success', 'error');
    modalWindow.classList.add(type);

    modalMessage.textContent = message;

    modalOverlay.classList.add('show');
    modalCloseBtn.focus();
}

function hideModal() {
    modalOverlay.classList.remove('show');
}

modalCloseBtn.addEventListener('click', hideModal);
modalActionBtn.addEventListener('click', hideModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        hideModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
        hideModal();
    }
});

// ========== ВАЛИДАЦИЯ ПОЛЕЙ ФОРМЫ ==========
const form = document.querySelector('#contact-form');
const phoneInput = form.querySelector('input[name="phone"]');
const emailInput = form.querySelector('input[name="email"]');
const errorContainer = document.getElementById('contact-error');
const privacyCheck = document.getElementById('privacy-check');
const submitBtn = document.getElementById('submit-btn');

phoneInput.addEventListener('input', clearValidationError);
emailInput.addEventListener('input', clearValidationError);

function clearValidationError() {
    phoneInput.classList.remove('input-error');
    emailInput.classList.remove('input-error');
    errorContainer.classList.remove('show');
}

function showValidationError(message) {
    phoneInput.classList.add('input-error');
    emailInput.classList.add('input-error');
    errorContainer.textContent = message;
    errorContainer.classList.add('show');
}

// Активация кнопки отправки только при согласии
privacyCheck.addEventListener('change', function() {
    submitBtn.disabled = !this.checked;
});

// ========== ОТПРАВКА ФОРМЫ (reCAPTCHA v2) ==========
const scriptURL = 'https://script.google.com/macros/s/AKfycbyM2Dw7eRDvmhwP7q-GsENuekbM96WKx_fRj0sbSZT3J0SNaecQ_6trEv9XDbJcNfWV/exec';

form.addEventListener('submit', e => {
    e.preventDefault();

    // 1. Проверка согласия
    if (!privacyCheck.checked) {
        showValidationError('Необходимо дать согласие на обработку персональных данных.');
        return;
    }

    // 2. Проверка заполненности телефона или email
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    if (!phone && !email) {
        showValidationError('Укажите телефон или email для связи.');
        return;
    }

    // 3. Проверка, что API капчи загружен
    if (typeof grecaptcha === 'undefined') {
        showValidationError('Сервис проверки ещё не загрузился, попробуйте через пару секунд.');
        return;
    }

    // 4. Получаем ответ от виджета
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        showValidationError('Пожалуйста, подтвердите, что вы не робот.');
        return;
    }

    // 5. Блокируем кнопку
    submitBtn.disabled = true;
    submitBtn.innerText = 'Отправка...';

    // 6. Собираем данные формы
    const formData = new FormData(form);
    formData.append('g-recaptcha-response', recaptchaResponse); // добавляем токен капчи

    // 7. Отправляем
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            showModal('success', 'Спасибо! Доктор скоро свяжется с вами.');
            form.reset();
            privacyCheck.checked = false;
            submitBtn.disabled = true;
            submitBtn.innerText = 'Отправить';
            grecaptcha.reset(); // сбрасываем капчу для следующей отправки
        })
        .catch(error => {
            console.error('Ошибка!', error.message);
            showModal('error', 'Ошибка! Заявка не отправилась. Вы можете связаться с доктором по телефону, email или в мессенджерах.');
            submitBtn.disabled = false;
            submitBtn.innerText = 'Отправить';
        });
});

// ========== ВСПЛЫВАЮЩИЕ УВЕДОМЛЕНИЯ (TOAST) ==========
function showToast(message, duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 300);
    }, duration);
}

// ========== КОПИРОВАНИЕ ТЕКСТА ==========
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const textToCopy = btn.dataset.copy;
        if (!textToCopy) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showToast(`Скопировано: ${textToCopy}`);
                })
                .catch(err => {
                    console.error('Ошибка копирования:', err);
                    showToast('Не удалось скопировать', 2000);
                });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showToast(`Скопировано: ${textToCopy}`);
            } catch (err) {
                console.error('Ошибка копирования (fallback):', err);
                showToast('Не удалось скопировать', 2000);
            }
            document.body.removeChild(textarea);
        }
    });

    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});