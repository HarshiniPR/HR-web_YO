const section4 = document.querySelector(".section-4");
const section4Left1 = document.querySelector(".section-4-left-1");
const section4Left2 = document.querySelector(".section-4-left-2");
const section4Left3 = document.querySelector(".section-4-left-3");
const section4Left4 = document.querySelector(".section-4-left-4");
const section4Left5 = document.querySelector(".section-4-left-5");
const section4RightImg = document.querySelector(".section-4-right-img");

const section4RightImg1 = "./images/home page.gif";
const section4RightImg2 = "./images/internships page.gif";
const section4RightImg3 = "./images/resume builder page.gif";
const section4RightImg4 = "./images/job listing page.gif";
const section4RightImg5 = "./images/card rating page.gif";

// add scroll event listener
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const section4OffsetTop = section4.offsetTop;
  const section4Height = section4.clientHeight;

  if (
    scrollPosition > section4OffsetTop &&
    scrollPosition < section4Height + section4OffsetTop
  ) {
    if (
      scrollPosition > section4OffsetTop &&
      scrollPosition < section4OffsetTop + 300
    ) {
      section4Left1.style.opacity = 1;
    } else if (
      scrollPosition > section4OffsetTop + innerHeight &&
      scrollPosition < section4OffsetTop + innerHeight + 300
    ) {
      section4Left2.style.opacity = 1;
    } else if (
      scrollPosition > section4OffsetTop + innerHeight * 2 &&
      scrollPosition < section4OffsetTop + innerHeight * 2 + 300
    ) {
      section4Left3.style.opacity = 1;
    } else if (
      scrollPosition > section4OffsetTop + innerHeight * 3 &&
      scrollPosition < section4OffsetTop + innerHeight * 3 + 300
    ) {
      section4Left4.style.opacity = 1;
    } else if (
      scrollPosition > section4OffsetTop + innerHeight * 4 &&
      scrollPosition < section4OffsetTop + innerHeight * 4 + 300
    ) {
      section4Left5.style.opacity = 1;
    } else {
      section4Left1.style.opacity = 0;
      section4Left2.style.opacity = 0;
      section4Left3.style.opacity = 0;
      section4Left4.style.opacity = 0;
      section4Left5.style.opacity = 0;
    }

    if (
      scrollPosition > section4OffsetTop &&
      scrollPosition < section4OffsetTop + innerHeight
    ) {
      section4RightImg.src = section4RightImg1;
    } else if (
      scrollPosition > section4OffsetTop + innerHeight &&
      scrollPosition < section4OffsetTop + innerHeight * 2
    ) {
      section4RightImg.src = section4RightImg2;
    } else if (
      scrollPosition > section4OffsetTop + innerHeight * 2 &&
      scrollPosition < section4OffsetTop + innerHeight * 3
    ) {
      section4RightImg.src = section4RightImg3;
    } else if (
      scrollPosition > section4OffsetTop + innerHeight * 3 &&
      scrollPosition < section4OffsetTop + innerHeight * 4
    ) {
      section4RightImg.src = section4RightImg4;
    } else if (
      scrollPosition > section4OffsetTop + innerHeight * 4 &&
      scrollPosition < section4OffsetTop + innerHeight * 5
    ) {
      section4RightImg.src = section4RightImg5;
    } else {
      section4RightImg.src = section4RightImg1;
    }
  }
});

//login and register section starts here

const body = document.querySelector(".blur");
const wrapper = document.querySelector(".wrapper");
const wrapper2 = document.querySelector(".wrapper2");
const loginForm = document.getElementById("loginForm");
const cancelBtn = document.querySelector(".cancelButton");

// // Get the login button element
// const loginButton = document.getElementById("loginBtn");
// // Get the login form wrapper element
// const formWrapper = document.querySelector(".wrapper2");
// // Add an event listener to the login button
// loginButton.addEventListener("click", () => {
//   // Toggle the 'show' class on the form wrapper to show/hide the form
//   formWrapper.classList.toggle("show");
// });

function toggleLoginForm() {
  body.classList.add("blur");
  wrapper2.classList.toggle("show");
  body.style.overflow = "hidden";
  // Disable pointer events on all elements except the form
  const elements = document.querySelectorAll("*");
  elements.forEach((element) => {
    if (!element.closest(".inner2")) {
      element.classList.add("disable-pointer-events");
    }
  });
}

function toggleRegisterForm() {
  body.classList.add("blur");
  wrapper.classList.toggle("show");
  body.style.overflow = "hidden";
  // Disable pointer events on all elements except the form
  const elements = document.querySelectorAll("*");
  elements.forEach((element) => {
    if (!element.closest(".inner")) {
      element.classList.add("disable-pointer-events");
    }
  });
}

//login and register section ends here

// SLIDER JS
const slider2 = document.querySelector(".slider2");
const images = document.querySelectorAll(".slider2 img");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentImageIndex = 0;
const imageWidth = images[0].clientWidth;
let isTransitioning = false;

// Function to show the current image
function showImage(index) {
  isTransitioning = true;
  slider2.style.transform = `translateX(-${index * imageWidth}px)`;
}

// Event listener for the previous button
prevBtn.addEventListener("click", function () {
  if (!isTransitioning) {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
  }
});

// Event listener for the next button
nextBtn.addEventListener("click", function () {
  if (!isTransitioning) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
  }
});

// Add transitionend event listener to reset the isTransitioning flag
slider2.addEventListener("transitionend", function () {
  isTransitioning = false;
});

// Clone the first and last images for seamless transition
const firstImageClone = images[0].cloneNode(true);
const lastImageClone = images[images.length - 1].cloneNode(true);
slider2.appendChild(firstImageClone);
slider2.insertBefore(lastImageClone, images[0]);

// Adjust the slider width and initial position
slider2.style.width = `${imageWidth * (images.length + 2)}px`;
slider2.style.transform = `translateX(-${imageWidth}px)`;
