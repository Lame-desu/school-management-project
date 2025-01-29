// document.addEventListener("DOMContentLoaded", async function () {
//   const greeting = document.getElementById("greeting");
//   const fullNameEl = document.getElementById("full-name");
//   const usernameEl = document.getElementById("username");
//   const gradeEl = document.getElementById("grade");
//   const profilePicEl = document.getElementById("profile-pic");
//   const coursesTable = document.getElementById("courses-table");
//   const coursesTableBody = document.querySelector("#courses-table tbody");
//   const registerButton = document.getElementById("register-button");

//   try {
//     // Simulated Backend Response (Instead of Fetching from PHP)
//     const data = {
//       student: {
//         fullname: "John Doe",
//         username: "johndoe123",
//         grade: "10",
//         status: "status",
//         profile_picture: "../landing/assets/event1.jpg",
//       },
//       courses: [
//         { subject: "Mathematics" },
//         { subject: "Science" },
//         { subject: "History" },
//         { subject: "English" },
//         { subject: "Computer Science" },
//       ], // Leave empty [] if the student is not enrolled
//     };

//     const student = data.student;
//     const courses = data.courses;

//     // Display Student Info
//     fullNameEl.textContent = `Full Name: ${student.fullname}`;
//     usernameEl.textContent = `Username: ${student.username}`;
//     gradeEl.textContent = `Grade Level: ${student.grade}`;
//     profilePicEl.src =
//       student.profile_picture || "../landing/assets/event1.jpg";
//     greeting.textContent = `Welcome, ${student.fullname}!`;

//     // Display Courses
//     if (courses.length > 0) {
//       coursesTable.classList.remove("hidden");
//       courses.forEach((course) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `<td>${course.subject}</td>`;
//         coursesTableBody.appendChild(row);
//       });
//     } else {
//       registerButton.classList.remove("hidden");
//     }
//   } catch (error) {
//     console.error("Error fetching student data:", error);
//   }
// });

document.addEventListener("DOMContentLoaded", async function () {
  const greeting = document.getElementById("greeting");
  const fullNameEl = document.getElementById("full-name");
  const usernameEl = document.getElementById("username");
  const gradeEl = document.getElementById("grade");
  const profilePicEl = document.getElementById("profile-pic");
  const coursesSection = document.getElementById("courses-section");
  const coursesTable = document.getElementById("courses-table");
  const coursesTableBody = document.querySelector("#courses-table tbody");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.username) {
    window.location.href = "../landing/login.html"; // Redirect if user is not found
    return;
  }

  /**
   * Fetch student information from backend
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

      if (!result.success) {
        console.error("Failed to fetch student info:", result.message);
        return;
      }

      // Update UI with student details
      fullNameEl.textContent = `Full Name: ${result.student.fullname}`;
      usernameEl.textContent = `Username: ${result.student.username}`;
      gradeEl.textContent = `Grade Level: ${result.student.grade}`;
      profilePicEl.src = "../landing/assets/profile.jpg";

      // Check registration status
      handleStudentStatus(result.student.status, result.student.grade);
    } catch (error) {
      console.error("Error fetching student info:", error);
    }
  }

  /**
   * Handle student status (fetch subjects or redirect to courses page)
   */
  async function handleStudentStatus(status, grade) {
    if (status === "pending") {
      window.location.href = "courses.html"; // Redirect to courses page for payment
      return;
    }
    // Fetch subjects for registered students
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
      console.log(result);
      if (!result.success) {
        console.error("Failed to fetch subjects:", result.message);
        return;
      }

      coursesSection.classList.remove("hidden");

      result.courses.forEach((course) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${course.subject}</td>`;
        coursesTableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }

  // Initialize the page
  fetchStudentInfo();
});
