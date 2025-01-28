document.addEventListener("DOMContentLoaded", function () {
  const generalRemindersContainer = document.getElementById(
    "general-reminders-container"
  );
  const gradeRemindersContainer = document.getElementById(
    "grade-reminders-container"
  );
  const gradeNumber = document.getElementById("grade-number");

  // Simulated student data (current logged-in user)
  const student = {
    fullname: "John Doe",
    grade: "9",
  };

  async function fetchAndFilterPrivateAnnouncements() {
    // Backend data object to store the filtered results
    const backendData = {
      generalReminders: [], // Holds general private announcements
      gradeReminders: [], // Holds private announcements specific to the user's grade
    };

    try {
      // Fetch all announcements from the backend
      const response = await fetch(
        "http://localhost/website/school-management-website/backend/api/announcements.php"
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Failed to fetch announcements");
      }

      // Parse the JSON data from the response
      const data = await response.json();

      // Retrieve the signed-in user's grade from localStorage
      // const userGrade = localStorage.getItem("grade");
      const userGrade = student.grade;

      if (!userGrade) {
        console.error("User grade not found in localStorage.");
        return backendData;
      }

      // Filter private announcements
      const privateAnnouncements = data.filter(
        (announcement) => announcement.specificity === "private"
      );

      // Filter general private announcements
      backendData.generalReminders = privateAnnouncements.filter(
        (announcement) => announcement.private_scope === "General"
      );

      // Filter announcements specific to the user's grade
      backendData.gradeReminders = privateAnnouncements.filter(
        (announcement) => announcement.private_scope === `Grade ${userGrade}`
      );

      // console.log("Filtered Private Announcements:", backendData);
      return backendData; // Return the filtered data
    } catch (error) {
      console.error(
        "Error fetching and filtering private announcements:",
        error
      );
      return backendData; // Return the default empty structure on error
    }
  }

  // Example usage
  var backendData = {};
  async function assignPrivateAnnouncements() {
    backendData = await fetchAndFilterPrivateAnnouncements();
    displayCards(generalRemindersContainer, backendData.generalReminders);
    displayCards(gradeRemindersContainer, backendData.gradeReminders || []);
  }
  assignPrivateAnnouncements(); // Simulated backend response (each announcement now includes full description)
  function displayCards(container, data) {
    container.innerHTML = "";
    if (data.length === 0) {
      container.innerHTML = "<p>No reminders available.</p>";
      return;
    }
    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                <h3>${item.title}</h3>
                <p class="date">${item.date}</p>
                <h5>${item.summary}</h5>
                <p>${item.description}</p>
            `;
      container.appendChild(card);
    });
  }

  // Update Grade Number
  gradeNumber.textContent = student.grade;

  // Fetch and display reminders
});
