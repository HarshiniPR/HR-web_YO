const section4 = document.querySelector(".section-4");
const section4Left1 = document.querySelector(".section-4-left-1");
const section4Left2 = document.querySelector(".section-4-left-2");
const section4Left3 = document.querySelector(".section-4-left-3");
const section4Left4 = document.querySelector(".section-4-left-4");
const section4Left5 = document.querySelector(".section-4-left-5");
const section4RightImg = document.querySelector(".section-4-right-img");

const section4RightImg1 = "./images/home page.gif";
const section4RightImg2 = "./images/internship page.gif";
const section4RightImg3 = "./images/resume building page.gif";
const section4RightImg4 = "./images/job listings page.gif";
const section4RightImg5 = "./images/Linkedin Branding.gif";

//animated Text
// var typed = new Typed("#textingfirst", {
//   strings: ["Flight to Success"],
//   typeSpeed: 100,
//   backSpeed: 100,
//   backDelay: 1000,
//   loop: true,
// });

// Define scroll ranges for each section
const sectionRanges = [
  { start: 0, end: 0.2 },
  { start: 0.2, end: 0.4 },
  { start: 0.4, end: 0.6 },
  { start: 0.6, end: 0.8 },
  { start: 0.8, end: 1.0 },
];

// Function to update the content and image based on scroll position
function updateContentAndImage(scrollPosition) {
  let activeSection = -1;

  // Determine the active section based on scroll position
  for (let i = 0; i < sectionRanges.length; i++) {
    const { start, end } = sectionRanges[i];
    if (
      scrollPosition >= start * section4.clientHeight &&
      scrollPosition < end * section4.clientHeight
    ) {
      activeSection = i;
      break;
    }
  }

  // Update content and image opacity
  [
    section4Left2,
    section4Left3,
    section4Left5,
    section4Left4,
    section4Left1,
  ].forEach((section, index) => {
    section.style.opacity = index === activeSection ? 1 : 0;
  });

  // Update the image source smoothly
  let imgIndex = activeSection === -1 ? 0 : activeSection;
  section4RightImg.src = [
    section4RightImg2,
    section4RightImg3,
    section4RightImg5,
    section4RightImg4,
    section4RightImg1,
  ][imgIndex];
}

// Add scroll event listener
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const section4OffsetTop = section4.offsetTop;

  // Update content and image based on scroll position
  updateContentAndImage(scrollPosition - section4OffsetTop);
});

// Call updateContentAndImage on initial load
updateContentAndImage(2);

//login and register section starts here

const body = document.querySelector(".blur");
const wrapper = document.querySelector(".wrapper");
const wrapper2 = document.querySelector(".wrapper2");
const loginForm = document.getElementById("loginForm");
const cancelBtn = document.querySelector(".cancelButton");

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
