// auth.js - Include this in all protected frontend pages
async function checkAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "../landing/login.html"; // Redirect if no token
    return;
  }

  try {
    const response = await fetch(
      "http://localhost/website/school-management-website/backend/config/protected_routes.php",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response);
    const result = await response.json();

    if (!result.success) {
      localStorage.removeItem("token"); // Remove invalid token
      window.location.href = "../landing/login.html"; // Redirect to login
    }
  } catch (error) {
    console.error("Authentication error:", error);
    window.location.href = "../landing/login.html"; // Redirect on fetch error
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("account_logout");

  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      // Remove token and user data from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to home page
      window.location.href = "../landing/index.html";
    });
  }
});
// Run the authentication check on DOM load
document.addEventListener("DOMContentLoaded", checkAuth);
