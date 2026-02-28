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
    "7:00":  { type: "Двухэтапная схема", steps: [
        { time: "15:00–16:00", desc: "" },
        { time: "16:00–17:00", desc: "" },
        { time: "03:00–04:00", desc: "" },
        { time: "04:00–05:00", desc: "" }
    ]},
    "8:00":  { type: "Двухэтапная схема", steps: [
        { time: "16:00–17:00", desc: "" },
        { time: "17:00–18:00", desc: "" },
        { time: "04:00–05:00", desc: "" },
        { time: "05:00–06:00", desc: "" }
    ]},
    "9:00":  { type: "Двухэтапная схема", steps: [
        { time: "17:00–18:00", desc: "" },
        { time: "18:00–19:00", desc: "" },
        { time: "05:00–06:00", desc: "" },
        { time: "06:00–07:00", desc: "" }
    ]},
    "10:00": { type: "Двухэтапная схема", steps: [
        { time: "18:00–19:00", desc: "" },
        { time: "19:00–20:00", desc: "" },
        { time: "06:00–07:00", desc: "" },
        { time: "07:00–08:00", desc: "" }
    ]},
    "11:00": { type: "Двухэтапная схема", steps: [
        { time: "19:00–20:00", desc: "" },
        { time: "20:00–21:00", desc: "" },
        { time: "07:00–08:00", desc: "" },
        { time: "08:00–09:00", desc: "" }
    ]},
    "12:00": { type: "Двухэтапная схема", steps: [
        { time: "20:00–21:00", desc: "" },
        { time: "21:00–22:00", desc: "" },
        { time: "08:00–09:00", desc: "" },
        { time: "09:00–10:00", desc: "" }
    ]},
    "13:00": { type: "Двухэтапная схема", steps: [
        { time: "21:00–22:00", desc: "" },
        { time: "22:00–23:00", desc: "" },
        { time: "09:00–10:00", desc: "" },
        { time: "10:00–11:00", desc: "" }
    ]},
    "14:00": { type: "Одноэтапная схема", steps: [
        { time: "06:00–07:00", desc: "" },
        { time: "07:00–08:00", desc: "" },
        { time: "10:00–11:00", desc: "" },
        { time: "11:00–12:00", desc: "" }
    ]},
    "15:00": { type: "Одноэтапная схема", steps: [
        { time: "07:00–08:00", desc: "" },
        { time: "08:00–09:00", desc: "" },
        { time: "11:00–12:00", desc: "" },
        { time: "12:00–13:00", desc: "" }
    ]},
    "16:00": { type: "Одноэтапная схема", steps: [
        { time: "08:00–09:00", desc: "" },
        { time: "09:00–10:00", desc: "" },
        { time: "12:00–13:00", desc: "" },
        { time: "13:00–14:00", desc: "" }
    ]},
    "17:00": { type: "Одноэтапная схема", steps: [
        { time: "09:00–10:00", desc: "" },
        { time: "10:00–11:00", desc: "" },
        { time: "13:00–14:00", desc: "" },
        { time: "14:00–15:00", desc: "" }
    ]},
    "18:00": { type: "Одноэтапная схема", steps: [
        { time: "10:00–11:00", desc: "" },
        { time: "11:00–12:00", desc: "" },
        { time: "14:00–15:00", desc: "" },
        { time: "15:00–16:00", desc: "" }
    ]},
    "19:00": { type: "Одноэтапная схема", steps: [
        { time: "11:00–12:00", desc: "" },
        { time: "12:00–13:00", desc: "" },
        { time: "15:00–16:00", desc: "" },
        { time: "16:00–17:00", desc: "" }
    ]}
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

    const isTwoPhase = (selected <= "13:00"); // двухэтапная для времени до 13:00 включительно
    const steps = data.steps;

    let html = `<div class="schedule-badge">${data.type}</div>`;
    html += `<div class="schedule-title"><i class="fas fa-clock"></i> Ваше расписание на ${selected}</div>`;

    // --- Первый этап ---
    if (isTwoPhase) {
        html += `<div class="schedule-stage-title"><i class="fas fa-calendar-day"></i> Прием первой дозы – день накануне колоноскопии</div>`;
    } else {
        html += `<div class="schedule-stage-title"><i class="fas fa-sun"></i> Прием первой дозы – утром в день колоноскопии</div>`;
    }
    // Шаг 1 (раствор)
    html += `<div class="schedule-step">
        <div class="step-time">${steps[0].time}</div>
        <div class="step-desc"><strong>0,5 л раствора Эзиклен® (флакон 176 мл + вода до 500 мл)</strong> — выпить медленно, в течение 30–60 минут</div>
    </div>`;
    // Шаг 2 (жидкость)
    html += `<div class="schedule-step">
        <div class="step-time">${steps[1].time}</div>
        <div class="step-desc"><strong>1 л прозрачной жидкости</strong> (вода, чай, бульон)</div>
    </div>`;

    // --- Разделитель для двухэтапной схемы ---
    if (isTwoPhase) {
        html += `<div class="schedule-night"><i class="fas fa-moon"></i> Ночь</div>`;
        html += `<div class="schedule-stage-title"><i class="fas fa-cloud-sun"></i> Прием второй дозы – утром в день колоноскопии</div>`;
    } else {
        html += `<div class="schedule-stage-title"><i class="fas fa-clock"></i> Прием второй дозы – в день колоноскопии</div>`;
    }

    // Шаг 3 (раствор)
    html += `<div class="schedule-step">
        <div class="step-time">${steps[2].time}</div>
        <div class="step-desc"><strong>0,5 л раствора Эзиклен® (флакон 176 мл + вода до 500 мл)</strong> — выпить медленно, в течение 30–60 минут</div>
    </div>`;
    // Шаг 4 (жидкость)
    html += `<div class="schedule-step">
        <div class="step-time">${steps[3].time}</div>
        <div class="step-desc"><strong>1 л прозрачной жидкости</strong> (вода, чай, бульон)</div>
    </div>`;

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

    // Переключаем видимость иконок
    if (fullscreenMenu.classList.contains('active')) {
        burgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        burgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

// Открытие/закрытие по клику на бургер
burger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Закрытие при клике на ссылку в меню
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// Закрытие при клике вне меню (на сам оверлей, но не на контент)
fullscreenMenu.addEventListener('click', (e) => {
    if (e.target === fullscreenMenu) {
        toggleMenu();
    }
});

// При изменении размера окна: если ширина > 1159px и меню открыто, закрываем его
window.addEventListener('resize', () => {
    if (window.innerWidth > 1159 && fullscreenMenu.classList.contains('active')) {
        toggleMenu();
    }
});