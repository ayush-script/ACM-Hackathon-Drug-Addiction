// ================= DETAILS PAGE LOGIC (FINAL) =================

// Elements
const continueBtn = document.getElementById("continueBtn");
const moodOptions = document.querySelectorAll(".mood-options span");

// Selected mood
let selectedMood = null;

// ---------------- MOOD SELECTION ----------------
moodOptions.forEach(option => {
  option.style.cursor = "pointer";

  option.addEventListener("click", () => {
    moodOptions.forEach(o => o.classList.remove("active"));
    option.classList.add("active");
    selectedMood = option.dataset.value;
  });
});

// ---------------- CONTINUE ----------------
continueBtn.addEventListener("click", () => {
  const displayName = document.getElementById("displayName").value.trim();
  const ageRange = document.getElementById("ageRange").value;
  const primaryGoal = document.getElementById("primaryGoal").value;

  const authUser = JSON.parse(localStorage.getItem("authUser"));

  if (!authUser || !authUser.loggedIn) {
    alert("Please login or sign up first.");
    window.location.href = "auth.html";
    return;
  }

  // collect struggles
  const struggles = Array.from(
    document.querySelectorAll(".checkbox-group input:checked")
  ).map(cb => cb.value);

  // build user details
  const userDetails = {
    displayName: displayName || authUser.username,
    ageRange,
    goal: primaryGoal,
    mood: selectedMood,
    struggles,
    createdAt: authUser.createdAt
  };

  // SAVE PROFILE DATA
  localStorage.setItem("userDetails", JSON.stringify(userDetails));

  // MARK PROFILE COMPLETE
  authUser.profileCompleted = true;
  localStorage.setItem("authUser", JSON.stringify(authUser));

  // GO TO PROFILE (PROFILE = DASHBOARD)
  window.location.href = "profile.html";
});
