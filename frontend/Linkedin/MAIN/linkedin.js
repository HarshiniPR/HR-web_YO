// Animated text
var typed = new Typed("#texting", {
  strings: ["Stop dreaming", "there's no limit", "start Doing!"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// Animated text
let dropdownTimeout;
let isDropdownVisible = false;

document.addEventListener("DOMContentLoaded", function () {
  const dropdownContent = document.getElementById("dropdown-content");

  // Function to show the dropdown content
  function showDropdown() {
    clearTimeout(dropdownTimeout);
    dropdownContent.style.display = "block";
    isDropdownVisible = true;
  }

  // Function to hide the dropdown content
  function hideDropdown() {
    if (isDropdownVisible) {
      dropdownTimeout = setTimeout(function () {
        dropdownContent.style.display = "none";
        isDropdownVisible = false;
      }, 5000); // Set the delay in milliseconds (5 seconds in this case)
    }
  }

  // Hover on the navbar elements
  const navbarElements = document.querySelectorAll(".items");
  navbarElements.forEach((element) => {
    element.addEventListener("mouseenter", showDropdown);
    element.addEventListener("mouseleave", hideDropdown);
  });

  // Hide the dropdown when leaving the navbar area
  const navbar = document.querySelector(".Navbar");

  // Scroll down
  $(function () {
    $("a[href*=#]").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        { scrollTop: $($(this).attr("href")).offset().top },
        500,
        "linear"
      );
    });
  });
});
