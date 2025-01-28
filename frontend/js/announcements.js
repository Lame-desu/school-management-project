document.addEventListener("DOMContentLoaded", function () {
  const announcementContainer = document.getElementById(
    "announcement-container"
  );
  async function fetchAndFilterAnnouncements() {
    const announcements = []; // Initialize an empty array to store filtered announcements

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

      // Filter public announcements
      const publicAnnouncements = data.filter(
        (announcement) => announcement.specificity === "public"
      );

      // Add each public announcement's details to the announcements array
      publicAnnouncements.forEach((announcement) => {
        announcements.push({
          title: announcement.title,
          date: announcement.date,
          description: announcement.description,
          summary: announcement.summary,
        });
      });

      // console.log("Filtered Public Announcements:", announcements);
      return announcements; // Return the array for further use
    } catch (error) {
      console.error("Error fetching and filtering announcements:", error);
      return []; // Return an empty array in case of error
    }
  }

  // Example usage
  var announcements = [];
  async function assignAnnouncements() {
    announcements = await fetchAndFilterAnnouncements();
    // console.log(typeof announcements);
  }
  assignAnnouncements(); // Simulated backend response (each announcement now includes full description)

  // Function to generate announcement cards dynamically
  function displayAnnouncements() {
    announcementContainer.innerHTML = ""; // Clear previous data

    announcements.forEach((announcement, index) => {
      const card = document.createElement("div");
      card.classList.add("announcement-card");

      card.innerHTML = `
                <img src="assets/image1.jpg" alt="${announcement.title}">
                <h3>${announcement.title}</h3>
                <p class="date">${announcement.date}</p>
                <p class="summary">${announcement.summary}</p>
                <p class="full-description" style="display: none;">${announcement.description}</p>
                <button class="btn read-more" data-index="${index}">Read More</button>
            `;

      announcementContainer.appendChild(card);
    });

    // Attach event listeners for "Read More" buttons
    document.querySelectorAll(".read-more").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const card = this.parentElement;
        const summary = card.querySelector(".summary");
        const fullDescription = card.querySelector(".full-description");

        // Toggle visibility
        if (fullDescription.style.display === "none") {
          summary.style.display = "none";
          fullDescription.style.display = "block";
          this.textContent = "Show Less";
        } else {
          summary.style.display = "block";
          fullDescription.style.display = "none";
          this.textContent = "Read More";
        }
      });
    });
  }

  // Simulate fetch from backend (using setTimeout to mimic API delay)
  setTimeout(displayAnnouncements, 1000);
});
