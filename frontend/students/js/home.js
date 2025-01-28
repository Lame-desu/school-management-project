document.addEventListener("DOMContentLoaded", async function () {
  const greeting = document.getElementById("greeting");
  const fullNameEl = document.getElementById("full-name");
  const emailEl = document.getElementById("email");
  const usernameEl = document.getElementById("username");
  const gradeEl = document.getElementById("grade");
  const profilePicEl = document.getElementById("profile-pic");
  const coursesTable = document.getElementById("courses-table");
  const coursesTableBody = document.querySelector("#courses-table tbody");
  const registerButton = document.getElementById("register-button");

  try {
    // Simulated Backend Response (Instead of Fetching from PHP)
    const data = {
      student: {
        fullname: "John Doe",
        email: "johndoe@example.com",
        username: "johndoe123",
        grade: "10",
        profile_picture: "../landing/assets/event1.jpg",
      },
      courses: [
        { subject: "Mathematics" },
        { subject: "Science" },
        { subject: "History" },
        { subject: "English" },
        { subject: "Computer Science" },
      ], // Leave empty [] if the student is not enrolled
    };

    const student = data.student;
    const courses = data.courses;

    // Display Student Info
    fullNameEl.textContent = `Full Name: ${student.fullname}`;
    emailEl.textContent = `Email: ${student.email}`;
    usernameEl.textContent = `Username: ${student.username}`;
    gradeEl.textContent = `Grade Level: ${student.grade}`;
    profilePicEl.src =
      student.profile_picture || "../landing/assets/event1.jpg";
    greeting.textContent = `Welcome, ${student.fullname}!`;

    // Display Courses
    if (courses.length > 0) {
      coursesTable.classList.remove("hidden");
      courses.forEach((course) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${course.subject}</td>`;
        coursesTableBody.appendChild(row);
      });
    } else {
      registerButton.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
});
