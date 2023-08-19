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
  const templateContentContainer = document.querySelector("#template-content");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "template1.html", true);
  xhr.onreadystatechange = function () {
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
//------------------------------------------------------------------------------------
//determine the chosen template from the query parameter
//and load the corresponding template structure into the preview section.
const previewSection = document.getElementById("preview-section");
const queryParams = new URLSearchParams(window.location.search);
const chosenTemplate = queryParams.get("template");

// Load the chosen template structure based on the query parameter
if (chosenTemplate) {
  fetch(`${chosenTemplate}.html`) // Fetch the corresponding template content
    .then((response) => response.text())
    .then((templateContent) => {
      // Create a wrapping div for the template content
      const templateWrapper = document.createElement("div");
      templateWrapper.classList.add("zoom-out-container"); // Add the zoom-out class to the wrapper
      templateWrapper.innerHTML = templateContent;

      // Append the wrapped template content to the preview section
      previewSection.appendChild(templateWrapper);
    });
}

//live preview starts

// const aboutInputs = document.querySelector(".cv-form-about input");
// aboutInputs.forEach((input) => {
//   input.addEventListener("input", updatePreview);
// });

// function updatePreview() {
//   const firstName = document.querySelector("firstname").value;
//   const lastName = document.querySelector("lastname").value;
//   const designation = document.querySelector("designation").value;
//   const address = document.querySelector(".address").value;
//   const email = document.querySelector(".email").value;
//   const phoneNo = document.querySelector(".phoneno").value;
//   const summary = document.querySelector(".summary").value;

//   // Update the preview section in createresume.html
//   previewSection.innerHTML = `
//     <h2> ${firstName} ${lastName}</h2>
//     <p>${designation}</p>
//     <p>${address}</p>
//     <p>${email}</p>
//     <p>${phoneNo}</p>
//     <p>${summary}</p>`;

//     const aboutData = {
//       firstName,
//       lastName,
//       designation,
//       address,
//       email,
//       phoneNo,
//       summary,
//     };
//     localStorage.setItem("resumeData", JSON.stringify(aboutData));

// }
// Add an event listener to each input element in the form

// Update the preview section based on the input values
window.onload = function () {
  function updatePreview() {
    const firstName = document.querySelector(".firstname").value;
    const lastName = document.querySelector(".lastname").value;
    const designation = document.querySelector(".designation").value;
    console.log("Hello");
    console.log(designation);
    const address = document.querySelector(".address").value;
    const email = document.querySelector(".email").value;
    const phoneNo = document.querySelector(".phoneno").value;
    const summary = document.querySelector(".summary").value;

    // Update the corresponding elements in the template preview
    const profileName = document.querySelector(".profileText h2");

    const profileDesignation = profileName.querySelector("#profDes");
    console.log("HI");
    console.log(profileDesignation);
    const contactPhone = document.querySelector(".text.phone");
    const contactEmail = document.querySelector(".text.email");
    const contactAddress = document.querySelector(".text.location");
    const aboutSummary = document.querySelector(".about p");

    // Update the elements in the preview
    profileName.innerHTML = `${firstName} ${lastName} <br/> <span id="profDes">${designation}</span>`;
    console.log("now "+profileName);

    profileDesignation.textContent = designation;
    console.log("now2 "+profileDesignation);

    contactPhone.textContent = phoneNo;
    contactEmail.textContent = email;
    contactAddress.textContent = address;
    aboutSummary.textContent = summary;

    // Store the updated data in localStorage
    const aboutData = {
      firstName,
      lastName,
      designation,
      address,
      email,
      phoneNo,
      summary,
    };
    localStorage.setItem("resumeData", JSON.stringify(aboutData));
    console.log(aboutData)
  }
  
  const inputElements = document.querySelectorAll(".cv-form-about input");
  inputElements.forEach((input) => {
    input.addEventListener("input", updatePreview);
  });
  
};
