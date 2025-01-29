document.addEventListener("DOMContentLoaded", async function () {
  const paymentSection = document.getElementById("payment-section");
  const coursesSection = document.getElementById("courses-section");
  const coursesTable = document.getElementById("courses-table");
  const coursePriceEl = document.getElementById("course-price");
  const payButton = document.getElementById("pay-button");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  console.log("here");
  if (!user || !user.username) {
    window.location.href = "../landing/login.html"; // Redirect if user is not found
    return;
  }

  /**
   * Fetch student info to check status
   */
  async function fetchStudentInfo() {
    try {
      const response = await fetch(
        "http://localhost/website/school-management-website/backend/api/fetch_student_info.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (!result.success) {
        console.error("Failed to fetch student info:", result.message);
        return;
      }

      if (result.student.status === "pending") {
        paymentSection.classList.remove("hidden"); // Show payment form
      } else {
        fetchSubjects(result.student.grade); // Show enrolled courses
      }
    } catch (error) {
      console.error("Error fetching student info:", error);
    }
  }

  /**
   * Fetch subjects for the student's grade
   */
  async function fetchSubjects(grade) {
    try {
      const response = await fetch(
        "http://localhost/website/school-management-website/backend/api/fetch_subjects.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ grade: grade }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        console.error("Failed to fetch subjects:", result.message);
        return;
      }

      coursesSection.classList.remove("hidden");

      result.courses.forEach((course) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${course.subject}</td>`;
        coursesTable.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }

  /**
   * Handle Payment & Update Student Status
   */
  payButton.addEventListener("click", async function () {
    const fullName = document.getElementById("full-name").value.trim();
    const accountNumber = document
      .getElementById("account-number")
      .value.trim();
    const paymentMethod = document.getElementById("payment-method").value;

    if (!fullName || !accountNumber) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/website/school-management-website/backend/api/change_student_status.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.username,
            status: "registered",
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Payment successful! You are now registered.");
        paymentSection.classList.add("hidden"); // Hide payment form
        fetchSubjects(user.grade_id); // Fetch and display enrolled courses

        // Update user status in localStorage
        user.status = "registered";
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        alert("Payment failed: " + result.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred. Please try again.");
    }
  });

  // Initialize page
  fetchStudentInfo();
});
