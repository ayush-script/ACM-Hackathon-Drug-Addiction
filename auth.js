// AUTH LOGIC (UI + FLOW ONLY)

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

// SIGN UP
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

  const user = {
    username,
    email,
    loggedIn: true,
    profileCompleted: false
  };

  localStorage.setItem("currentUser", JSON.stringify(user));

  // GO TO DETAILS FORM
  window.location.href = "details.html";
});

// LOGIN
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = loginForm.querySelectorAll("input");
  const email = inputs[0].value.trim();
  const password = inputs[1].value.trim();

  if (!email || !password) {
    alert("Please fill login details");
    return;
  }

  let user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("No account found. Please sign up.");
    return;
  }

  user.loggedIn = true;
  localStorage.setItem("currentUser", JSON.stringify(user));

  // IF PROFILE DONE → DASHBOARD
  if (user.profileCompleted) {
    window.location.href = "profile.html";
  } else {
    window.location.href = "details.html";
  }
});
