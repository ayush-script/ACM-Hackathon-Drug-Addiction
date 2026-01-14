const profileBtn = document.getElementById("profileBtn");
const dropdown = document.getElementById("profileDropdown");

const user = JSON.parse(localStorage.getItem("currentUser"));

// IF LOGGED IN
if (user && user.loggedIn) {
  dropdown.innerHTML = `
    <a href="profile.html">👤 ${user.displayName || user.username}</a>
    <a href="#" id="logoutBtn">🚪 Sign out</a>
  `;
}

// TOGGLE DROPDOWN
if (profileBtn && dropdown) {
  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  dropdown.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });
}

// LOGOUT
document.addEventListener("click", (e) => {
  if (e.target.id === "logoutBtn") {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  }
});
