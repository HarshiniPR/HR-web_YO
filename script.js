const section4 = document.querySelector('.section-4')
// const section2 = document.querySelector('.section-2')

const section4Left1 = document.querySelector('.section-4-left-1')
const section4Left2 = document.querySelector('.section-4-left-2')
const section4Left3 = document.querySelector('.section-4-left-3')
const section4Left4 = document.querySelector('.section-4-left-4')

const section4RightImg = document.querySelector('.section-4-right-img')


const section4RightImg1 = "https://web-images.credcdn.in/_next/assets/images/home-page/features/neopop-fold1.png";
const section4RightImg2 = "https://web-images.credcdn.in/_next/assets/images/home-page/features/neopop-fold2.png";
const section4RightImg3 = "https://web-images.credcdn.in/_next/assets/images/home-page/features/neopop-fold3.png";
const section4RightImg4 = "https://web-images.credcdn.in/_next/assets/images/home-page/features/neopop-fold4.png";

// add scroll event listener
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY
    const section4OffsetTop = section4.offsetTop
    const section4Height = section4.clientHeight

    if ((scrollPosition > section4OffsetTop) && (scrollPosition < section4Height + section4OffsetTop)) {
        if (scrollPosition > section4OffsetTop && scrollPosition < section4OffsetTop + 300) {
            section4Left1.style.opacity = 1
            section4Left1.style.transition = 'opacity 1s ease-in-out'
        } else if (scrollPosition > section4OffsetTop + innerHeight && scrollPosition < section4OffsetTop + innerHeight + 300) {
            section4Left2.style.opacity = 1
            section4Left2.style.transition = 'opacity 1s ease-in-out'
        } else if (scrollPosition > section4OffsetTop + innerHeight * 2 && scrollPosition < section4OffsetTop + innerHeight * 2 + 300) {
            section4Left3.style.opacity = 1
            section4Left3.style.transition = 'opacity 1s ease-in-out'
        } else if (scrollPosition > section4OffsetTop + innerHeight * 3 && scrollPosition < section4OffsetTop + innerHeight * 3 + 300) {
            section4Left4.style.opacity = 1
            section4Left4.style.transition = 'opacity 1s ease-in-out'
        } else {
            section4Left1.style.opacity = 0
            section4Left2.style.opacity = 0
            section4Left3.style.opacity = 0
            section4Left4.style.opacity = 0
        }

        if (scrollPosition > section4OffsetTop && scrollPosition < section4OffsetTop + innerHeight) {
            section4RightImg.src = section4RightImg1
            section4RightImg.style.transition = 'opacity 1s ease-in-out'
        } else if (scrollPosition > section4OffsetTop + innerHeight && scrollPosition < section4OffsetTop + innerHeight * 2) {
            section4RightImg.src = section4RightImg2
            section4RightImg.style.transition = 'opacity 1s ease-in-out'
        } else if (scrollPosition > section4OffsetTop + innerHeight * 2 && scrollPosition < section4OffsetTop + innerHeight * 3) {
            section4RightImg.src = section4RightImg3
            section4RightImg.style.transition = 'opacity 1s ease-in-out'
        } else if (scrollPosition > section4OffsetTop + innerHeight * 3 && scrollPosition < section4OffsetTop + innerHeight * 4) {
            section4RightImg.src = section4RightImg4
            section4RightImg.style.transition = 'opacity 1s ease-in-out'
        } else {
            section4RightImg.src = section4RightImg1
        }
    }
})


//slider images
var images = document.querySelectorAll('.slider img');
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');
var currentImageIndex = 0;

// Function to show the current image
function showImage(index) {
  // Hide all images
  images.forEach(function(image) {
    image.classList.remove('active');
  });

  // Show the image at the specified index
  images[index].classList.add('active');
}

// Event listener for the previous button
prevBtn.addEventListener('click', function() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
});

// Event listener for the next button
nextBtn.addEventListener('click', function() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
});

// Show the initial image
showImage(currentImageIndex);

