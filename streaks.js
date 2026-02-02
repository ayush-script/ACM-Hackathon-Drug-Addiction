/*******************************
 * DAILY CHECK-IN + STREAKS
 * Stable | Persistent | Clean
 *******************************/

// ---------- CONFIG ----------
const STORAGE_KEY = "dailyCheckins";

// ---------- DATE HELPERS ----------
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function isSameDate(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

// ---------- LOAD STORAGE ----------
let checkins = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};


// ================== RATING UI ==================
const labels = [
  ["Very Low","Low","Okay","Good","Energetic"],
  ["None","Weak","Manageable","Strong","Very Strong"],
  ["Foggy","Low","Okay","Clear","Sharp"],
  ["Calm","Low","Moderate","High","Overwhelmed"],
  ["Poor","Weak","Average","Strong","Excellent"]
];

document.querySelectorAll(".question").forEach((q, qi) => {
  const row = q.querySelector(".rating-row");
  const textarea = q.querySelector(".extra-input");

  labels[qi].forEach((label, i) => {
    const opt = document.createElement("div");
    opt.className = "rating-option";
    opt.innerHTML = `<span>⭐</span><small>${label}</small>`;

    opt.onclick = () => {
      row.querySelectorAll(".rating-option").forEach(o => o.classList.remove("active"));
      for (let j = 0; j <= i; j++) row.children[j].classList.add("active");
      textarea.style.display = i <= 1 ? "block" : "none";
    };

    row.appendChild(opt);
  });
});


// ================== CALENDAR ==================
const grid = document.getElementById("calendarGrid");
const title = document.getElementById("monthYear");

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function renderCalendar() {
  grid.innerHTML = "";
  title.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.textContent = d;

    const cellDate = new Date(currentYear, currentMonth, d);

    if (isSameDate(cellDate, today)) {
      cell.classList.add("today");
    }

    const key = `${currentYear}-${currentMonth}-${d}`;
    if (checkins[key]) {
      cell.classList.add("completed");
    }

    grid.appendChild(cell);
  }
}

renderCalendar();

document.getElementById("prevMonth").onclick = () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
};


// ================== SUBMIT CHECK-IN ==================
const submitBtn = document.getElementById("submitBtn");

function lockForm() {
  document.querySelectorAll(".rating-option").forEach(o => o.style.pointerEvents = "none");
  document.querySelectorAll(".extra-input").forEach(t => t.disabled = true);
  submitBtn.disabled = true;
  submitBtn.textContent = "✔ Check-in completed";
}

submitBtn.onclick = () => {
  const todayKey = getTodayKey();

  if (checkins[todayKey]) {
    alert("You’ve already completed today’s check-in 💚");
    lockForm();
    return;
  }

  checkins[todayKey] = {
    timestamp: Date.now()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkins));
  renderCalendar();
  lockForm();
};


// ================== AUTO-LOCK IF DONE TODAY ==================
if (checkins[getTodayKey()]) {
  lockForm();
}


// ================== STREAK CALCULATION ==================
function calculateStreak() {
  let streak = 0;
  let d = new Date();

  while (true) {
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (checkins[key]) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// Save streak for dashboard
localStorage.setItem("currentStreak", calculateStreak());
