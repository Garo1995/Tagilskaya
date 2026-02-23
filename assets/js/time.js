document.addEventListener('DOMContentLoaded', function () {
    const timerEl = document.querySelector('.timer');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');

    // Безопасно получить строку даты: сначала data-attribute, потом глобальная переменная window.TIMER_DATE (если есть)
    let raw = (timerEl && timerEl.dataset && timerEl.dataset.deadline) ? timerEl.dataset.deadline.trim() : '';
    if (!raw && typeof window.TIMER_DATE !== 'undefined') raw = String(window.TIMER_DATE).trim();

    // Парсер: возвращает Date или null
    function parseDeadline(str) {
        if (!str) return null;
        str = String(str).trim();

        // если это непарсируемый PHP-шаблон (оставшийся как '<?=$...?>'), считаем пустым
        if (/[<\?]|&#60;|\$arResult/.test(str)) return null;

        // только цифры — timestamp (секунды или миллисекунды)
        if (/^\d+$/.test(str)) {
            if (str.length === 10) return new Date(Number(str) * 1000); // seconds
            return new Date(Number(str)); // ms
        }

        // DD.MM.YYYY или DD.MM.YYYY HH:MM[:SS]
        const dm = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
        if (dm) {
            const d = Number(dm[1]), m = Number(dm[2]) - 1, y = Number(dm[3]);
            const hh = dm[4] ? Number(dm[4]) : 0;
            const mm = dm[5] ? Number(dm[5]) : 0;
            const ss = dm[6] ? Number(dm[6]) : 0;
            const dt = new Date(y, m, d, hh, mm, ss);
            return isNaN(dt.getTime()) ? null : dt;
        }

        // пробуем стандартный парсер (ISO и т.п.)
        const iso = new Date(str);
        return isNaN(iso.getTime()) ? null : iso;
    }

    // Получаем дедлайн
    let deadlineDate = parseDeadline(raw);

    // Если дата невалидна или в прошлом — используем fallback +7 дней
    function fallbackSevenDays() {
        const fb = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        console.warn('TIMER: использован fallback +7 дней (либо дата пустая/неправильная/в прошлом). Исходная строка:', raw);
        return fb;
    }

    if (!deadlineDate || deadlineDate.getTime() <= Date.now()) {
        deadlineDate = fallbackSevenDays();
    }

    // основной апдейт
    function updateTimer() {
        const now = Date.now();
        let t = deadlineDate.getTime() - now;

        // если вдруг истёк (например, страница висит долго) — чтобы не показать "Акция завершена", можно:
        // а) остановить и показать сообщение
        // б) автоматически пересоздать новый дедлайн (например, restart на +7 дней)
        // здесь делаем поведение: если истёк — устанавливаем новый дедлайн +7 дней и продолжаем (чтобы не было "Акция завершена")
        if (t <= 0) {
            // опция: если хочешь показывать сообщение вместо перезапуска — закомментируй следующий блок и раскомментируй innerHTML ниже
            deadlineDate = fallbackSevenDays();
            t = deadlineDate.getTime() - now;
            // document.querySelector(".timer").innerHTML = "<h3>Акция завершена!</h3>";
            // clearInterval(intervalId);
            // return;
        }

        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((t % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
});