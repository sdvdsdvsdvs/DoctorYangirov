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
    modal.style.display = 'block';
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
    html += `<div class="schedule-title"><i class="fas fa-clock"></i> Ваше расписание, если прием назначен на ${selected}</div>`;

    if (isTwoPhase) {
        html += `<div class="schedule-stage-title"><i class="fas fa-calendar-day"></i> Прием первой дозы – день накануне колоноскопии</div>`;
    } else {
        html += `<div class="schedule-stage-title"><i class="fas fa-sun"></i> Прием первой дозы – утром в день колоноскопии</div>`;
    }
    html += `<div class="schedule-step"><div class="step-time">${steps[0]}</div><div class="step-desc"><strong>0,5 л раствора Эзиклен® (флакон 176 мл + вода 324 мл)</strong> — выпить медленно, в течение 30–60 минут</div></div>`;
    html += `<div class="schedule-step"><div class="step-time">${steps[1]}</div><div class="step-desc"><strong>1 л прозрачной жидкости</strong> (вода, чай, бульон)</div></div>`;

    if (isTwoPhase) {
        html += `<div class="schedule-night"><i class="fas fa-moon"></i> Ночь</div>`;
        html += `<div class="schedule-stage-title"><i class="fas fa-cloud-sun"></i> Прием второй дозы – утром в день колоноскопии</div>`;
    } else {
        html += `<div class="schedule-stage-title"><i class="fas fa-clock"></i> Прием второй дозы – в день колоноскопии</div>`;
    }

    

    html += `<div class="schedule-step"><div class="step-time">${steps[2]}</div><div class="step-desc"><strong>0,5 л раствора Эзиклен® (флакон 176 мл + вода 324 мл)</strong> — выпить медленно, в течение 30–60 минут</div></div>`;
    html += `<div class="schedule-step"><div class="step-time">${steps[3]}</div><div class="step-desc"><strong>1 л прозрачной жидкости</strong> (вода, чай, бульон)</div></div>`;

html += `<div class="schedule-night"></i> Ничего не пить и не есть 2 часа</div>`;
    html += `<div class="schedule-stage-title"><i class="fas fa-stethoscope"></i> Колоноскопия в ${selected}</div>`;


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
    fullscreenMenu.classList.toggle('active');
    body.classList.toggle('menu-open');

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

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
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

// ========== МОДАЛЬНОЕ ОКНО (с иконками FontAwesome) ==========
const modalOverlay = document.getElementById('modal-overlay');
const modalWindow = document.getElementById('modal-window');
const modalIcon = document.getElementById('modal-icon');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalActionBtn = document.getElementById('modal-action-btn');

function showModal(type, message) {
    if (type === 'success') {
        modalIcon.innerHTML = '<i class="fas fa-circle-check" style="color: #1d4ed8; font-size: 4rem;"></i>';
    } else {
        modalIcon.innerHTML = '<i class="fas fa-circle-exclamation" style="color: #ef4444; font-size: 4rem;"></i>';
    }

    modalWindow.classList.remove('success', 'error');
    modalWindow.classList.add(type);

    modalMessage.textContent = message;

    modalOverlay.classList.add('show');
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

// ========== ВАЛИДАЦИЯ ПОЛЕЙ ФОРМЫ ==========
const form = document.querySelector('#contact-form');
const phoneInput = form.querySelector('input[name="phone"]');
const emailInput = form.querySelector('input[name="email"]');
const errorContainer = document.getElementById('contact-error');

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

// ========== ОТПРАВКА ФОРМЫ ==========
const scriptURL = 'https://script.google.com/macros/s/AKfycby2gWiLwazShucXK_yxyCwj2PVm_JL3PDso0v7ObjwPfG2dg6cIkdF2-N-PkZ6aFbeE/exec';

form.addEventListener('submit', e => {
    e.preventDefault();

    clearValidationError();

    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!phone && !email) {
        showValidationError('Укажите телефон или email для связи.');
        return;
    }

    const submitButton = form.querySelector('button');
    submitButton.disabled = true;
    submitButton.innerText = 'Отправка...';

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            showModal('success', 'Спасибо! Доктор скоро свяжется с вами.');
            form.reset();
            submitButton.disabled = false;
            submitButton.innerText = 'Отправить';
        })
        .catch(error => {
            console.error('Ошибка!', error.message);
            showModal('error', 'Ошибка! Заявка не отправилась. Вы можете связаться с доктором по телефону, email или в мессенджерах.');
            submitButton.disabled = false;
            submitButton.innerText = 'Отправить';
        });
});