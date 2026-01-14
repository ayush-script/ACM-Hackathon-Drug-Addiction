const continueBtn = document.getElementById("continueBtn");

continueBtn.addEventListener("click", () => {
  const displayName = document.getElementById("displayName").value.trim();
  const ageRange = document.getElementById("ageRange").value;
  const primaryGoal = document.getElementById("primaryGoal").value;

  let user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Please sign in first.");
    window.location.href = "auth.html";
    return;
  }

  // SAVE PROFILE DATA
  user.displayName = displayName || user.username;
  user.ageRange = ageRange;
  user.primaryGoal = primaryGoal;
  user.profileCompleted = true;

  localStorage.setItem("currentUser", JSON.stringify(user));

  // GO TO DASHBOARD / PROFILE
  window.location.href = "profile.html";
});
