// ================= AUTH LOGIC (FINAL, STABLE) =================

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

// ---------------- SIGN UP ----------------
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = signupForm.querySelectorAll("input");
  const username = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const phone = inputs[2].value.trim();
  const password = inputs[3].value.trim();

  if (!username || !email || !phone || !password) {
    alert("Please fill all sign up details");
    return;
  }

  const authUser = {
    username,
    email,
    phone,
    loggedIn: true,
    profileCompleted: false,
    createdAt: new Date().toISOString()
  };

  // SAVE LOGIN IDENTITY
  localStorage.setItem("authUser", JSON.stringify(authUser));

  // CLEAR OLD PROFILE (if any)
  localStorage.removeItem("userDetails");

  // GO TO DETAILS FORM
  window.location.href = "details.html";
});

// ---------------- LOGIN ----------------
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = loginForm.querySelectorAll("input");
  const email = inputs[0].value.trim();
  const password = inputs[1].value.trim();

  if (!email || !password) {
    alert("Please fill login details");
    return;
  }

  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  if (!authUser || authUser.email !== email) {
    alert("No account found. Please sign up.");
    return;
  }

  authUser.loggedIn = true;
  localStorage.setItem("authUser", JSON.stringify(authUser));

  // PROFILE DONE → DASHBOARD
  if (userDetails) {
    window.location.href = "index.html";
  } 
  // PROFILE NOT DONE → DETAILS
  else {
    window.location.href = "details.html";
  }
});
