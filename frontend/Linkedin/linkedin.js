// animated text
var typed = new Typed("#texting", {
  strings: ["Stop dreaming", "&amp;...", "start Doing!"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
// animated text

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


// scroll down
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


document.addEventListener("DOMContentLoaded", function () {
  // Initialize the Swiper.js slider
  var mySwiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 400, // Adjust this value as needed
    autoplay: {
      delay: 3000,
    },
    slidesPerView: 1,
    spaceBetween: 30,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    on: {
      init: function () {
        // Show navigation arrows after initializing the slider
        showArrows();
      },
    },
  });

  // Show navigation arrows
  function showArrows() {
    var arrows = document.querySelectorAll(".swiper-button-prev, .swiper-button-next");
    arrows.forEach(function (arrow) {
      arrow.style.opacity = 1;
    });
  }

  // Hide navigation arrows on slider transition
  mySwiper.on("transitionStart", function () {
    var arrows = document.querySelectorAll(".swiper-button-prev, .swiper-button-next");
    arrows.forEach(function (arrow) {
      arrow.style.opacity = 0;
    });
  });

  // Show navigation arrows on slider transition end
  mySwiper.on("transitionEnd", function () {
    showArrows();
  });
});








