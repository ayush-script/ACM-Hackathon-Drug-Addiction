// ================= HEADER LOGIC (SIGN OUT FIXED FOR REAL) =================

// Elements (exist on pages with header)
const profileBtn = document.getElementById("profileBtn");
const dropdown = document.getElementById("profileDropdown");

// Read auth state
const authUser = JSON.parse(localStorage.getItem("authUser"));
const userDetails = JSON.parse(localStorage.getItem("userDetails"));

// ---------------- RENDER DROPDOWN ----------------
function renderDropdown() {
  if (!dropdown) return;

  // LOGGED IN
  if (authUser && authUser.loggedIn) {
    const name =
      (userDetails && userDetails.displayName) ||
      authUser.username ||
      "User";

    dropdown.innerHTML = `
      <a href="profile.html">👤 ${name}</a>
      <a href="#" id="logoutBtn">🚪 Sign out</a>
    `;
  } 
  // LOGGED OUT
  else {
    dropdown.innerHTML = `
      <a href="auth.html">🔐 Login</a>
      <a href="auth.html#signup">✨ Sign up</a>
    `;
  }
}

// Initial render
renderDropdown();

// ---------------- TOGGLE DROPDOWN ----------------
if (profileBtn && dropdown) {
  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });
}

// ---------------- SIGN OUT (THIS IS THE FIX) ----------------
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logoutBtn") {
    e.preventDefault();
    e.stopPropagation();

    const confirmLogout = window.confirm(
      "Do you really want to sign out?"
    );

    if (!confirmLogout) {
      dropdown.style.display = "none";
      return;
    }

    // CLEAR AUTH
    localStorage.removeItem("authUser");
    localStorage.removeItem("userDetails");

    // UPDATE UI (NO REDIRECT)
    dropdown.style.display = "none";
    location.reload(); // refresh header only
  }
});
