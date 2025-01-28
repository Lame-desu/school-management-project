document.addEventListener("DOMContentLoaded", function () {
  const visibilitySelect = document.getElementById("visibility");
  const privateOptions = document.getElementById("private-options");
  const form = document.getElementById("announcement-form");

  // Show/hide private options based on visibility selection
  visibilitySelect.addEventListener("change", function () {
    if (this.value === "private") {
      privateOptions.style.display = "block";
    } else {
      privateOptions.style.display = "none";
    }
  });

  // Handle form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Gather form data
    const title = document.getElementById("title").value;
    const summary = document.getElementById("summary").value;
    const description = document.getElementById("description").value;
    const specificity = document.getElementById("visibility").value;
    const private_scope =
      specificity === "private"
        ? document.getElementById("private-type").value
        : null;
    console.log(document.getElementById("private-type").value);

    // Create the payload
    const payload = {
      title,
      description,
      summary,
      specificity,
      private_scope,
    };
    console.log(payload);
    // Send data to the backend
    try {
      const response = await fetch(
        "http://localhost/website/school-management-website/backend/api/announcements.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Announcement posted successfully!");
        form.reset();
        privateOptions.style.display = "none"; // Reset visibility options
      } else {
        alert("Failed to post announcement. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while posting the announcement.");
    }
  });
});
