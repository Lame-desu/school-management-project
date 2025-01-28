document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("#login-form form");
  const registerForm = document.querySelector("#register-form form");
  const loginMessage = document.querySelector("#login-form .message");
  const registerMessage = document.querySelector("#register-form .message");

  const showLoginBtn = document.getElementById("show-login");
  const showRegisterBtn = document.getElementById("show-register");
  const loginSection = document.getElementById("login-form");
  const registerSection = document.getElementById("register-form");

  // Toggle Between Login & Register
  showRegisterBtn.addEventListener("click", () => {
    loginSection.classList.add("hidden");
    registerSection.classList.remove("hidden");
  });

  showLoginBtn.addEventListener("click", () => {
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  });

  // Login Request
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const role = document.querySelector("input[name='role']:checked")?.value;

    if (!role) {
      loginMessage.textContent = "Please select a role.";
      return;
    }

    const response = await fetch("../backend/auth.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    const result = await response.json();

    loginMessage.textContent = result.message;
    if (result.success) {
      setTimeout(() => {
        window.location.href = result.redirect;
      }, 1500);
    }
  });

  // Register Request
  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      first_name: document.getElementById("register-firstname").value.trim(),
      last_name: document.getElementById("register-lastname").value.trim(),
      username: document.getElementById("register-username").value.trim(),
      password: document.getElementById("register-password").value.trim(),
      grade_id: document.getElementById("register-grade").value,
    };

    const response = await fetch(
      "http://localhost/website/school-management-website/backend/auth/register.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();
    console.log(result);
    registerMessage.textContent = result.message;

    if (result.success) {
      registerSection.classList.add("hidden");
      loginSection.classList.remove("hidden");
    }
  });
});

// ("C:/xampp/htdocs/website/school-management-website/backend/auth/register.php");
