const closeButton = document.querySelector("[data-close-button]");
const pwButton = document.querySelector(".preview-btn");
// Get the modal container element
const modalContainer = document.querySelector(".modal");

//Function to open modal
function openModal() {
  modalContainer.style.display = "block"; // Show the modal
}
// Event listener to for preview button
pwButton.addEventListener("click", openModal);
// Function to close the modal
function closeModal() {
  modalContainer.style.display = "none"; // Hide the modal
}
closeButton.addEventListener("click", closeModal);
