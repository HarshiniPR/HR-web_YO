const closeButton = document.querySelector("[data-close-button]");
const ytElements = document.querySelectorAll(".yt");
// Get the modal container element
const modalContainer = document.querySelector(".yt-modal");

//Function to open modal
function openModal(videoId) {
  const iframe = modalContainer.querySelector("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  modalContainer.style.display = "block"; // Show the modal
}
ytElements.forEach((ytElement) => {
  ytElement.addEventListener("click", (event) => {
    const imgElement = event.target.closest("img");
    if (imgElement) {
      const videoId = imgElement.getAttribute("data-video-id");
      if (videoId) {
        openModal(videoId);
      }
    }
  });
});
// Function to close the modal
function closeModal() {
  modalContainer.style.display = "none"; // Hide the modal
  // If you want to stop the video when closing the modal, uncomment the line below
  modalContainer.querySelector("iframe").src = "";
}

// Event listener for the close button
closeButton.addEventListener("click", closeModal);
