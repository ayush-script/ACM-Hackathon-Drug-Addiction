// ================= PROFILE PAGE LOGIC (REALISTIC & MOTIVATING) =================

const authUser = JSON.parse(localStorage.getItem("authUser"));
const userDetails = JSON.parse(localStorage.getItem("userDetails"));

// Protect page
if (!authUser || !authUser.loggedIn || !userDetails) {
  window.location.href = "auth.html";
}

// USERNAME
document.getElementById("username").textContent =
  userDetails.displayName || authUser.username;

// META
const joinedDate = authUser.createdAt
  ? new Date(authUser.createdAt).toLocaleDateString()
  : "—";

document.querySelector(".meta").textContent =
  `Age: ${userDetails.ageRange || "—"} · Member since ${joinedDate}`;

// STATS (START HONEST)
document.getElementById("streakText").textContent = "0 days";
document.getElementById("diaryCount").textContent = "0 entries";
document.getElementById("avgMood").textContent = "—";
document.getElementById("riskLevel").textContent = "Being assessed";

// TODAY FOCUS (PSYCHOLOGY-BASED)
const focusMap = {
  "Reduce urges": "Notice urges without acting on them.",
  "Prevent relapse": "Avoid known triggers today.",
  "Build discipline & habits": "Consistency over intensity.",
  "Just exploring": "Learn how your patterns work."
};

document.getElementById("todayFocus").textContent =
  focusMap[userDetails.goal] ||
  "Take one small positive step today.";

// GOAL HIGHLIGHT
document.querySelectorAll(".chips")[0]
  .querySelectorAll(".chip")
  .forEach(chip => {
    if (chip.textContent.trim() === userDetails.goal) {
      chip.classList.add("active");
    }
  });

// PATTERNS
const patternContainer = document.getElementById("patternChips");
patternContainer.innerHTML = "";

if (!userDetails.struggles || userDetails.struggles.length === 0) {
  const span = document.createElement("span");
  span.className = "chip";
  span.textContent = "No patterns identified yet";
  patternContainer.appendChild(span);
} else {
  userDetails.struggles.forEach(item => {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = item;
    patternContainer.appendChild(span);
  });
}
