// 1. Set up event listeners during initial page load
// This code should run once.

const templateURL = "../i";

// document.addEventListener("DOMContentLoaded", function () {
//   const inputElements = document.querySelectorAll(".content_box input");
//   inputElements.forEach((input) => {
//     input.addEventListener("input", updatePreview);
//   });

//   // 2. Function to update the preview
//   function updatePreview() {
//     // Get the education sections from the modal
//     const educationSections = document.querySelectorAll(".education");

//     // Loop through the education sections and update the preview
//     for (const educationSection of educationSections) {
//       const schoolInput = educationSection.querySelector(
//         "input[name='edu_school']"
//       );
//       const degreeInput = educationSection.querySelector(
//         "input[name='edu_degree']"
//       );
//       const periodInput = educationSection.querySelector(
//         "input[name='edu_period']"
//       );

//       // Update the preview with the input values
//       educationSection.querySelector(".edu_school").textContent =
//         schoolInput.value;
//       educationSection.querySelector(".edu_degree").textContent =
//         degreeInput.value;
//       educationSection.querySelector(".edu_period").textContent =
//         periodInput.value;
//     }

//     // Store the updated data in localStorage
//     // const Data = {
//     //   firstName,
//     //   lastName,
//     //   designation,
//     //   address,
//     //   email,
//     //   phoneNo,
//     //   summary,
//     //   expSY,
//     //   expEY,
//     //   expCompany,
//     //   expDesc,
//     //   expName,
//     //   schoolClg,
//     //   degree,
//     //   eduSY,
//     //   eduEY,
//     //   percentage,
//     // };
//     // localStorage.setItem("resumeData", JSON.stringify(Data));
//   }
// });

// Assume this function is inside an event listener or some appropriate trigger
function updatePreview() {
  // Get the education sections from the modal
  const educationSections = document.querySelectorAll(".education");

  // Loop through the education sections and update the preview
  educationSections.forEach((educationSection) => {
    const schoolInput = educationSection.querySelector(
      "input[name='edu_school']"
    );
    const degreeInput = educationSection.querySelector(
      "input[name='edu_degree']"
    );
    const periodInput = educationSection.querySelector(
      "input[name='edu_period']"
    );

    // Update the preview with the input values
    const schoolElement = educationSection.querySelector(".edu_school");
    const degreeElement = educationSection.querySelector(".edu_degree");
    const periodElement = educationSection.querySelector(".edu_period");

    schoolElement.textContent = schoolInput.value;
    degreeElement.textContent = degreeInput.value;
    periodElement.textContent = periodInput.value;
  });

  // Optionally, store the updated data in localStorage
  // You can uncomment and adapt the following lines if needed
  // const data = {
  //   education: [],
  // };

  // educationSections.forEach((educationSection) => {
  //   const schoolInput = educationSection.querySelector("input[name='edu_school']").value;
  //   const degreeInput = educationSection.querySelector("input[name='edu_degree']").value;
  //   const periodInput = educationSection.querySelector("input[name='edu_period']").value;

  //   data.education.push({
  //     school: schoolInput,
  //     degree: degreeInput,
  //     period: periodInput,
  //   });
  // });

  // localStorage.setItem("resumeData", JSON.stringify(data));
}

// Call the updatePreview function when needed, for example, in response to an event.
// For example:
// const updateButton = document.getElementById("updateButton");
// updateButton.addEventListener("click", updatePreview);

const addEducationButton = document.querySelector("#addEducation");

// Add an event listener to the "+" button
addEducationButton.addEventListener("click", addEducationEntry);

function addEducationEntry() {
  // Create new elements to represent the education entry
  const newLi = document.createElement("li");
  const period = document.createElement("h5");
  const degree = document.createElement("h4");
  const school = document.createElement("h4");

  // Get the input values for the new education entry
  const eduSY = document.querySelector(".edu_sy").value;
  const eduEY = document.querySelector(".edu_ey").value;
  const degreeValue = document.querySelector(".edu_degree").value;
  const schoolValue = document.querySelector(".edu_school").value;

  // Set the content for the new elements
  period.textContent = `${eduSY}-${eduEY}`;
  degree.textContent = degreeValue;
  school.textContent = schoolValue;

  // Append the new elements to the list item (li)
  newLi.appendChild(period);
  newLi.appendChild(degree);
  newLi.appendChild(school);

  // Find the list of education entries in template1
  const educationList = document.querySelector(".education ul");

  // Append the new education entry (li) to the education list
  educationList.appendChild(newLi);
}
// 3. Function to open the modal
const modalContainer = document.querySelector(".modal");
function openModal() {
  const modalContentContainer = document.querySelector("#template-content");
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
        const email = document.querySelector("#email").value;
        const linkedin = document.querySelector(".linkedin").value;
        const website = document.querySelector(".website").value;
        const phoneNo = document.querySelector(".phoneno").value;
        const summary = document.querySelector(".summary").value;
        const imageInput = document.querySelector(".image");

        const displayImage = document.querySelector("#displayImage");
        const profileName = document.querySelector(".profileText h2");
        const contactPhone = document.querySelector(".text.phone");
        const contactEmail = document.querySelector(".text.email");
        const inputLinkedin = document.querySelector(".linkedIn");
        const inputWeb = document.querySelector(".myweb");
        const contactAddress = document.querySelector(".text.location");
        const aboutSummary = document.querySelector(".about p");

        profileName.innerHTML = `${firstName} ${lastName} <br/> <span id="profDes">${designation}</span>`;
        contactPhone.innerHTML = `<span class="icon"><i class="fa-solid fa-phone"></i></span>
        <span class="text ">${phoneNo}</span>`;
        contactEmail.innerHTML = `<span class="icon"><i class="fa-regular fa-envelope"></i></span>
        <span class="text email">${email}</span>`;
        inputLinkedin.textContent = linkedin;
        inputWeb.innerHTML = `<span class="icon"><i class="fa-solid fa-globe"></i></span>
        <span class="text myweb">${website}</span>`;
        contactAddress.innerHTML = ` <span class="icon"><i class="fa-solid fa-location-dot"></i></span>
        <span class="text location">${address}</span>`;
        aboutSummary.textContent = summary;

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
        <h5>${expSY} - ${expEY}</h5></div>`;
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

        const educationList = document.querySelector(".education ul");
        const educationLis = [];
        const addEducationButton = document.querySelector("#addEducation");

        addEducationButton.addEventListener("click", function () {
          const newEducationLi = document.createElement("li");
          newEducationLi.innerHTML = `
            <h5 class="edu_period">XXXX-YYYY</h5>
            <h4 class="degree">Degree</h4>
            <h4 class="uni">Collage name</h4>
          `;

          educationLis.push(newEducationLi);

          educationList.appendChild(newEducationLi);

          // Update the preview of the newly added education section
        });

        //ACHIEVEMENTS Section
        const achieveInput = document.querySelector(".achieve_title").value;
        const achieveDescInput = document.querySelector(
          ".achieve_description"
        ).value;
        const achievement = document.querySelector(".achievement-item");

        achievement.innerHTML = `<h4>${achieveInput} </h4> <div class="achievedesc"> | ${achieveDescInput}</div>`;
        //SKILLS Section
        const skillinput = document.querySelector(".skill").value;
        const skills = document.querySelector(".skills h4");

        skills.textContent = skillinput;
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
