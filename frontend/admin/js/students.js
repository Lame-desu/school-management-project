document.addEventListener("DOMContentLoaded", function () {
  const gradeSelect = document.getElementById("grade-select");
  const fetchButton = document.getElementById("fetch-students-btn");
  const studentsList = document.getElementById("students-ul");
  const studentsCount = document.getElementById("students-count");

  // Fetch students for the selected grade
  async function fetchStudents(grade) {
    try {
      // Replace with your backend API endpoint
      const response = await fetch(
        `https://your-backend-api.com/students?grade=${encodeURIComponent(
          grade
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch students.");
      }

      const data = await response.json();

      // Update students list and count
      studentsList.innerHTML = ""; // Clear the list
      studentsCount.textContent = `Total Students: ${data.length}`;
      data.forEach((student) => {
        const li = document.createElement("li");
        li.textContent = `${student.firstName} ${student.lastName} (ID: ${student.id})`;
        studentsList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      studentsList.innerHTML =
        "<li>Error fetching students. Please try again later.</li>";
      studentsCount.textContent = "Total Students: 0";
    }
  }

  // Add event listener to the fetch button
  fetchButton.addEventListener("click", function () {
    const selectedGrade = gradeSelect.value;
    fetchStudents(selectedGrade);
  });
});
