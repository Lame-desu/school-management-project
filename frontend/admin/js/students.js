document.addEventListener("DOMContentLoaded", function () {
  const gradeSelect = document.getElementById("grade-select");
  const studentsTableBody = document.getElementById("students-table");

  /**
   * Fetch students based on selected grade
   */
  async function fetchStudents(grade) {
    if (!grade) {
      studentsTableBody.innerHTML =
        "<tr><td colspan='3'>Please select a grade.</td></tr>";
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/website/school-management-website/backend/api/fetch_students.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ grade: grade }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        studentsTableBody.innerHTML = `<tr><td colspan='3'>${result.message}</td></tr>`;
        return;
      }

      studentsTableBody.innerHTML = ""; // Clear previous data

      result.students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${student.fullname}</td>
                  <td>${student.username}</td>
                  <td>${student.status}</td>
              `;
        studentsTableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      studentsTableBody.innerHTML =
        "<tr><td colspan='3'>Error loading students.</td></tr>";
    }
  }

  // Event Listener for Grade Selection
  gradeSelect.addEventListener("change", function () {
    fetchStudents(this.value);
  });
});
