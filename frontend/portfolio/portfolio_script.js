const uploadButton = document.getElementById('upload-button');
const photoInput = document.getElementById('photo');
const previewImage = document.getElementById('preview-image');

photoInput.addEventListener('change', () => {
  const selectedFile = photoInput.files[0];

  if (selectedFile) {
    const objectURL = URL.createObjectURL(selectedFile);
    previewImage.src = objectURL;
    previewImage.style.display = 'block';
  } else {
    previewImage.src = '';
    previewImage.style.display = 'none';
  }
});

uploadButton.addEventListener('click', () => {
  // Perform the actual upload here if needed
});

const settingsButton = document.querySelector("#settings-button");
const overviewButton = document.querySelector("#overview-button");
const settingsContent = document.querySelector(".settings-content");
const overviewContent = document.querySelector(".overview");
const settingsLink = document.querySelector('.settings a');
const profileLink = document.querySelector('.profile a');

settingsButton.addEventListener("click", () => {
  settingsContent.style.display = "block";
  overviewContent.style.display = "none";
});

overviewButton.addEventListener("click", () => {
  settingsContent.style.display = "none";
  overviewContent.style.display = "block";
});

document.getElementById("save-btn").addEventListener("click", () => {
  console.log("hello")
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const designation = document.getElementById('designation').value;
  const phoneNo = document.getElementById('phoneNo').value;
  const address = document.getElementById('address').value;
  const fileInput = document.getElementById('photo');
  const selectedFile = fileInput.files[0];
  const linkedIn = document.getElementById('linkedin').value;
  const college = document.getElementById('college').value;
  const degree = document.getElementById('degree').value;
  const major = document.getElementById('major').value;
  const graduationYear = document.getElementById('graduationYear').value;
  const cg = document.getElementById('cg').value;
  const skillsInput = document.getElementById('skills').value;
  const experienceInput = document.getElementById('comment').value;

  const skills = skillsInput.split(' ').map(skill => skill.trim());

  const experiences = experienceInput.split(' ').map(experience => experience.trim());

  const contacts = { phoneNo, address };
  const education = { degree, major, college, graduationYear, cg };

  let profilePicture;
  if (selectedFile) {
    profilePicture=selectedFile;
  }
  const portalData = {
    firstName, lastName, designation, email, linkedIn,profilePicture, contacts, education, skills, experiences
  }
  console.log(portalData)

  fetch('http://localhost:4002/api/portal/new', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(portalData),
  })
      .then(response => response.json())
      .then((data) => {
          if (data.success) {
              console.log(data)
              console.log("Portal created")
          } else {
              if (data.message)
                  window.alert(data.message)
              if (data.errors)
                  window.alert(data.errors)
              console.log('failed:', data);
          }
      })
      .catch(error => {
          console.error('ye Error h:', error);
      });

});

// Add click event listener for "Settings" link
settingsLink.addEventListener('click', () => {
  // Hide the overview content
  overviewContent.style.display = 'none';
  // Show the settings content
  settingsContent.style.display = 'block';
});

// Add click event listener for "Profile Overview" link
profileLink.addEventListener('click', () => {
  // Hide the settings content
  settingsContent.style.display = 'none';
  // Show the overview content
  overviewContent.style.display = 'block';
});
