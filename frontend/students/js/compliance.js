document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".compliance-card h3").forEach((header) => {
    header.addEventListener("click", function () {
      this.parentElement.classList.toggle("active");
    });
  });
});
