// script.js

const calendarEl = document.getElementById("calendar");
const monthLabel = document.getElementById("monthLabel");
const now = new Date();
let currentYear = now.getFullYear();
let focusedEl = null;
let holidays = {};

function getStorageKey(year, month, date) {
  return `memo-${year}-${month}-${date}`;
}

async function fetchHolidays(year) {
  try {
    const response = await fetch("https://holidays-jp.github.io/api/v1/date.json");
    const data = await response.json();
    holidays = {};
    for (const [dateStr, name] of Object.entries(data)) {
      const dateObj = new Date(dateStr);
      if (dateObj.getFullYear() === year) {
        const key = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
        holidays[key] = name;
      }
    }
  } catch (error) {
    console.error("祝日の取得に失敗しました:", error);
  }
}

function renderCalendar(year) {
  calendarEl.innerHTML = "";
  monthLabel.textContent = `${year}年`;

  for (let month = 0; month < 12; month++) {
    const monthContainer = document.createElement("div");
    monthContainer.className = "month-container";

    const title = document.createElement("h3");
    title.textContent = `${month + 1}月`;
    monthContainer.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "month-grid";

    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
    for (let d of daysOfWeek) {
      const header = document.createElement("div");
      header.className = "header";
      header.textContent = d;
      grid.appendChild(header);
    }

    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay();

    for (let i = 0; i < startDay; i++) {
      grid.appendChild(document.createElement("div"));
    }

    for (let date = 1; date <= lastDate; date++) {
      const dayEl = document.createElement("div");
      dayEl.className = "day";

      const dateLabel = document.createElement("div");
      dateLabel.className = "day-number";
      dateLabel.textContent = date;

      const memoEl = document.createElement("div");
      memoEl.className = "memo";
      memoEl.contentEditable = true;

      const key = getStorageKey(year, month, date);
      memoEl.textContent = localStorage.getItem(key) || "";

      memoEl.addEventListener("input", () => {
        localStorage.setItem(key, memoEl.textContent.trim());
      });

      memoEl.addEventListener("focus", () => {
        if (focusedEl) focusedEl.classList.remove("focused");
        memoEl.classList.add("focused");
        focusedEl = memoEl;
      });

      const isToday = date === now.getDate() &&
                      month === now.getMonth() &&
                      year === now.getFullYear();
      if (isToday) {
        dayEl.classList.add("today");
      }

      const holidayKey = `${year}-${month}-${date}`;
      if (holidays[holidayKey]) {
        dayEl.classList.add("holiday");
      }

      dayEl.appendChild(dateLabel);
      dayEl.appendChild(memoEl);
      grid.appendChild(dayEl);
    }

    monthContainer.appendChild(grid);
    calendarEl.appendChild(monthContainer);
  }
}

fetchHolidays(currentYear).then(() => {
  renderCalendar(currentYear);
});
