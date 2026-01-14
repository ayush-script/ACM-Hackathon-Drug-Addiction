const labels = [
  ["Very Low","Low","Okay","Good","Energetic"],
  ["None","Weak","Manageable","Strong","Very Strong"],
  ["Foggy","Low","Okay","Clear","Sharp"],
  ["Calm","Low","Moderate","High","Overwhelmed"],
  ["Poor","Weak","Average","Strong","Excellent"]
];

// BUILD RATING UI
document.querySelectorAll(".question").forEach((q, qi) => {
  const row = q.querySelector(".rating-row");
  const textarea = q.querySelector(".extra-input");

  labels[qi].forEach((label, i) => {
    const opt = document.createElement("div");
    opt.className = "rating-option";

    opt.innerHTML = `<span>⭐</span><small>${label}</small>`;

    opt.onclick = () => {
      row.querySelectorAll(".rating-option").forEach(o => o.classList.remove("active"));
      for (let j = 0; j <= i; j++) {
        row.children[j].classList.add("active");
      }
      textarea.style.display = i <= 1 ? "block" : "none";
    };

    row.appendChild(opt);
  });
});

// CALENDAR
const year = 2026;
let month = 0;
const todayDate = 9;

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const grid = document.getElementById("calendarGrid");
const title = document.getElementById("monthYear");

function renderCalendar() {
  grid.innerHTML = "";
  title.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement("div"));

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.textContent = d;

    if (month === 0 && d === todayDate) cell.classList.add("today");

    grid.appendChild(cell);
  }
}

renderCalendar();

document.getElementById("prevMonth").onclick = () => {
  month = (month + 11) % 12;
  renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
  month = (month + 1) % 12;
  renderCalendar();
};

document.getElementById("submitBtn").onclick = () => {
  document.querySelectorAll(".rating-option").forEach(o => o.style.pointerEvents = "none");
  document.querySelectorAll(".extra-input").forEach(t => t.disabled = true);
  document.getElementById("submitBtn").disabled = true;

  const today = document.querySelector(".today");
  if (today) today.classList.add("completed");
};
