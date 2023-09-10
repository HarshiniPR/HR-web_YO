// 1. Set up event listeners during initial page load
// This code should run once.
const templateURL = "../i";

document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll(".content_box input");
  inputElements.forEach((input) => {
    input.addEventListener("input", updatePreview);
  });

  // 2. Function to update the preview
  function updatePreview() {
    //Select element from createresume.html
    // //ABOUT Section
    // const firstName = document.querySelector(".firstname").value;
    // const lastName = document.querySelector(".lastname").value;
    // const designation = document.querySelector(".designation").value;
    // const address = document.querySelector(".address").value;
    // const email = document.querySelector(".email").value;
    // const phoneNo = document.querySelector(".phoneno").value;
    // const summary = document.querySelector(".summary").value;

    // const profileName = document.querySelector(".profileText h2");
    // const contactPhone = document.querySelector(".text.phone");
    // const contactEmail = document.querySelector(".text.email");
    // const contactAddress = document.querySelector(".text.location");
    // const aboutSummary = document.querySelector(".about p");
    // console.log(firstName);
    // Update the elements in the preview
    // profileName.innerHTML = `${firstName} ${lastName} <br/> <span id="profDes">${designation}</span>`;
    // contactPhone.textContent = phoneNo;
    // contactEmail.textContent = email;
    // contactAddress.textContent = address;
    // aboutSummary.textContent = summary;
    // console.log(profileName);
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
    const skills = document.querySelector(".skills h4");

    skills.textContent = skillinput;
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
      schoolClg,
      degree,
      eduSY,
      eduEY,
      percentage,
    };
    localStorage.setItem("resumeData", JSON.stringify(Data));
  }
});
// 3. Function to open the modal
const modalContainer = document.querySelector(".modal");
function openModal() {
  const modalContentContainer = document.querySelector("#template-content");

  // Fetch and load the chosen template into the modal
  // if (chosenTemplate) {
  //   fetch(`${chosenTemplate}.html`)
  //     .then((response) => response.text())
  //     .then((templateContent) => {
  //       modalContentContainer.innerHTML = templateContent;
  //       modalContainer.style.display = "block"; // Show the modal
  //     });
  // }
  if (chosenTemplate) {
    fetch(`${chosenTemplate}.html`)
      .then((response) => response.text())
      .then((templateContent) => {
        modalContainer.style.display = "block";
        modalContentContainer.innerHTML = templateContent;
        //Update the elements in the preview
        //ABOUT Section
        const firstName = document.querySelector(".firstname").value;
        const lastName = document.querySelector(".lastname").value;
        const designation = document.querySelector(".designation").value;
        const address = document.querySelector(".address").value;
        const email = document.querySelector(".email").value;
        const phoneNo = document.querySelector(".phoneno").value;
        const summary = document.querySelector(".summary").value;

        const profileName = document.querySelector(".profileText h2");
        const contactPhone = document.querySelector(".text.phone");
        const contactEmail = document.querySelector(".text.email");
        const contactAddress = document.querySelector(".text.location");
        const aboutSummary = document.querySelector(".about p");
        console.log(firstName);
        console.log(email);
        console.log(lastName);
        console.log(designation);
        console.log(phoneNo);
        console.log(summary);
        profileName.innerHTML = `${firstName} ${lastName} <br/> <span id="profDes">${designation}</span>`;
        contactPhone.textContent = phoneNo;
        contactEmail.textContent = email;
        contactAddress.textContent = address;
        aboutSummary.textContent = summary;
        console.log(profileName);
        console.log(contactEmail);
        console.log(contactAddress);
        console.log(aboutSummary);
        console.log(contactPhone);
      });
  }
}

// 4. Function to close the modal
function closeModal() {
  modalContainer.style.display = "none"; // Hide the modal
}
// 5. Fetch and load template content (if needed)
const queryParams = new URLSearchParams(window.location.search);
const chosenTemplate = queryParams.get("template");
function mapTemplateToImage(templateName) {
  const templateNumber = parseInt(templateName.replace("template", ""));
  const imageName = `CV-${templateNumber}.png`;
  console.log(imageName);
  return imageName;
}

if (chosenTemplate) {
  const cvImage = document.querySelector(".preview-column img");
  const imageName = mapTemplateToImage(chosenTemplate);
  cvImage.src = `../images/resume-build/${imageName}`;
}

function printCV() {
  window.print();
}
