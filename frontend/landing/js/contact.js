document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulated submission
    setTimeout(() => {
      alert("Message sent successfully! We will get back to you soon.");
      form.reset();
    }, 1000);
  });
});
