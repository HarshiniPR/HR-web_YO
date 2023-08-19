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
