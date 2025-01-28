document.addEventListener("DOMContentLoaded", function () {
  const paymentSection = document.getElementById("payment-section");
  const coursesSection = document.getElementById("courses-section");
  const coursesTable = document.getElementById("courses-table");
  const coursePriceEl = document.getElementById("course-price");
  const payButton = document.getElementById("pay-button");

  // Simulated Backend Response
  let student = {
    fullname: "John Doe",
    grade: "10",
    status: "pending", // Change to "registered" after payment
  };

  const subjectsByGrade = {
    10: [
      { subject: "Mathematics" },
      { subject: "Science" },
      { subject: "History" },
      { subject: "English" },
      { subject: "Computer Science" },
    ],
  };

  const coursePrices = {
    10: 5000, // Simulated price for the course
  };

  function loadCoursesPage() {
    const subjects = subjectsByGrade[student.grade] || [];
    const coursePrice = coursePrices[student.grade] || 0;

    if (student.status === "pending") {
      // Show payment section
      paymentSection.classList.remove("hidden");
      coursePriceEl.textContent = `$${coursePrice}`;
    } else {
      // Show registered courses
      coursesSection.classList.remove("hidden");
      subjects.forEach((subject) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${subject.subject}</td>`;
        coursesTable.appendChild(row);
      });
    }
  }

  payButton.addEventListener("click", function () {
    const fullName = document.getElementById("full-name").value.trim();
    const accountNumber = document
      .getElementById("account-number")
      .value.trim();
    const paymentMethod = document.getElementById("payment-method").value;

    if (!fullName || !accountNumber) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    // Simulating Payment Processing
    setTimeout(() => {
      alert(`Payment successful via ${paymentMethod}. You are now registered.`);
      student.status = "registered"; // Update status
      paymentSection.classList.add("hidden");
      loadCoursesPage(); // Reload UI with registered courses
    }, 1500);
  });

  loadCoursesPage();
});
