// ================= PROFILE PAGE LOGIC =================

// Get stored data
const authUser = JSON.parse(localStorage.getItem("authUser"));
const userDetails = JSON.parse(localStorage.getItem("userDetails"));

// Protect profile page
if (!authUser || !userDetails) {
  window.location.href = "auth.html";
}

// ================= USERNAME =================
const usernameEl = document.getElementById("username");
if (usernameEl) {
  usernameEl.textContent =
    userDetails.displayName || authUser.username || "User";
}

// ================= META (AGE + JOIN DATE) =================
const metaEl = document.querySelector(".meta");

const joinedDate = authUser.createdAt
  ? new Date(authUser.createdAt).toLocaleDateString()
  : "—";

const ageText = userDetails.ageRange || "—";

if (metaEl) {
  metaEl.textContent = `Age: ${ageText} · Member since ${joinedDate}`;
}

// ================= GOAL HIGHLIGHT =================
document.querySelectorAll(".chip").forEach(chip => {
  chip.classList.remove("active");
  if (chip.textContent.trim() === userDetails.primaryGoal) {
    chip.classList.add("active");
  }
});

// ================= PATTERNS / STRUGGLES =================
const patternContainer = document.querySelectorAll(".chips")[1];
patternContainer.innerHTML = "";

if (!userDetails.struggles || userDetails.struggles.length === 0) {
  const span = document.createElement("span");
  span.className = "chip";
  span.textContent = "No data yet";
  patternContainer.appendChild(span);
} else {
  userDetails.struggles.forEach(item => {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = item;
    patternContainer.appendChild(span);
  });
}
