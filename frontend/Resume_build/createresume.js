// Get the modal container element
const modalContainer = document.querySelector(".modal");

//Function to open modal
const pwButton = document.querySelector(".preview-btn");
function openModal() {
    modalContainer.style.display = "block"; // Show the modal
    loadTemplateContent();
}
pwButton.addEventListener("click", openModal);
// Load template content into modal
function loadTemplateContent() {
    const templateContentContainer = document.querySelector('#template-content');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'template1.html', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        templateContentContainer.innerHTML = xhr.responseText; // Load content
      }
    };
    xhr.send();
  }
// Function to close the modal
const closeButton = document.querySelector("[data-close-button]");
function closeModal() {
  modalContainer.style.display = "none"; // Hide the modal
}
closeButton.addEventListener("click", closeModal);
