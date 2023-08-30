// Get the modal container element
const modalContainer = document.querySelector(".modal");

//Function to open modal
const pwButton = document.querySelector(".preview-btn");
function openModal() {
  modalContainer.style.display = "block"; // Show the modal
  loadTemplateContent(chosenTemplate);
}
pwButton.addEventListener("click", openModal);
// Load template content into modal
function loadTemplateContent(templateName) {
  const templateContentContainer = document.querySelector("#template-content");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${templateName}.html`, true);
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
      previewSection.innerHTML = templateContent;
    });
}





// Add an event listener to each input element in the form
//======================================================================================================
// Update the preview section based on the input values
window.onload = function () {
  function updatePreview() {
    //Select element from createresume.html
    //ABOUT Section
    const firstName = document.querySelector(".firstname").value;
    const lastName = document.querySelector(".lastname").value;
    const designation = document.querySelector(".designation").value;
    const address = document.querySelector(".address").value;
    const email = document.querySelector(".email").value;
    const phoneNo = document.querySelector(".phoneno").value;
    const summary = document.querySelector(".summary").value;
    const website = document.querySelector(".website").value;
    const linkedin = document.querySelector(".linkedin").value;


    const profileName = document.querySelector("#profileText");
    const contactPhone = document.querySelector(".text.phone");
    const contactEmail = document.querySelector(".text.email");
    const contactAddress = document.querySelector(".text.location");
    const aboutSummary = document.querySelector(".about p");
    const aboutWebsite = document.querySelector(".text.web");
    const aboutLinkedin = document.querySelector(".text.linkedIn");
    // Update the elements in the preview
    profileName.innerHTML = `${firstName} ${lastName} <br/> <span id="profDes">${designation}</span>`;
    contactPhone.textContent = phoneNo;
    contactEmail.textContent = email;
    contactAddress.textContent = address;
    aboutSummary.textContent = summary;
    aboutWebsite.textContent = website;
    aboutLinkedin.textContent = linkedin;
    //ACHIEVEMENTS Section
    const achievement = document.querySelector(".achieve_title").value;
    const achieveDesc = document.querySelector(".achieve_description").value;
    //EXPERIENCE Section
    const expName = document.querySelector(".exp_title").value;
    const expCompany = document.querySelector(".exp_company").value;
    const expSY = document.querySelector(".exp_sy").value;
    const expEY = document.querySelector(".exp_ey").value;
    const expDesc = document.querySelector(".exp_description").value;

    const experienceTitle = document.querySelector(".role_title h4");
    const company = document.querySelector(".comp_name");
    const experiencePeriod = document.querySelector(".exp_period");
    const experienceDesc = document.querySelector(".desc_company");

    experiencePeriod.innerHTML = `<div class="year_company">
    <h5>${expSY} - ${expEY}</h5>
  </div>`;
    company.textContent = expCompany;
    experienceDesc.textContent = expDesc;
    experienceTitle.textContent = expName;

    //EDUCATION Section
    const schoolClg = document.querySelector(".edu_school").value;
    const degree = document.querySelector(".edu_degree").value;
    const eduSY = document.querySelector(".edu_sy").value;
    const eduEY = document.querySelector(".edu_ey").value;
    const percentage = document.querySelector(".edu_percent").value;

    const educationPeriod = document.querySelector(".edu_period");
    const eduDegree = document.querySelector(".degree");
    const schoolName = document.querySelector(".uni");

    educationPeriod.innerHTML = ` ${eduSY} - ${eduEY}`;
    eduDegree.innerHTML = `${degree} - ${percentage}`;
    schoolName.textContent = schoolClg;
    //PROJECTS Section
    const projectTitle = document.querySelector(".proj_title").value;
    const projectLink = document.querySelector(".proj_link").value;
    const projectDesc = document.querySelector(".proj_description").value;
    //SKILLS Section
    const skillinput = document.querySelector(".skill").value;
    const interestinput = document.querySelector(".interestInp").value;

    const skills = document.querySelector('.skills h4');
    const interest = document.querySelector('.interest ul li');

    skills.textContent = skillinput;
    interest.innerHTML = `<i class="fa-regular fa-snowflake"></i>${interestinput}`;
    //====================================================================================================
    // Update the corresponding elements in the template preview

    //ACHIEVEMENTS Section
    // const achieveTitle = document.querySelector(".achieve_title");
    // const achieveDescription = document.querySelector(".achieve_description");
    //EXPERIENCE Section
    
    //EDUCATION Section
    //PROJECTS Section
    //SKILLS Section
    

   
    // Store the updated data in localStorage
    const Data = {
      firstName,
      lastName,
      designation,
      address,
      email,
      phoneNo,
      summary,
      expSY,
      expEY,
      expCompany,
      expDesc,
      expName,
    };
    localStorage.setItem("resumeData", JSON.stringify(Data));
  }

  const inputElements = document.querySelectorAll(".content_box input");
  inputElements.forEach((input) => {
    input.addEventListener("input", updatePreview);
  });
};
