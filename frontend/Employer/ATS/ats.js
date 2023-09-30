const addCandidatesBtn = document.getElementById('addCandidatesBtn');
const pageDiv = document.getElementById('page-1');
const candidateDiv = document.getElementById('candidate');

// Initial state: Show 'page' and hide 'candidate'
pageDiv.style.display = 'block';
candidateDiv.style.display = 'none';

// Toggle the display when clicking the button
addCandidatesBtn.addEventListener('click', function () {
  if (pageDiv.style.display === 'block') {
    // Hide 'page' and show 'candidate'
    pageDiv.style.display = 'none';
    candidateDiv.style.display = 'block';
  } else {
    // Show 'page' and hide 'candidate'
    pageDiv.style.display = 'block';
    candidateDiv.style.display = 'none';
  }
});

//Resume

const fileInput = document.getElementById('file-input');
const fileLabel = document.getElementById('file-label');
const fileNameDisplay = document.getElementById('file-name');

fileInput.addEventListener('change', () => {
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    fileNameDisplay.textContent = selectedFile.name;
  } else {
    fileNameDisplay.textContent = 'No file chosen';
  }
});

const allowedExtensions = ['.pdf', '.doc', '.docx'];
const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

fileInput.addEventListener('change', () => {
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    const fileExtension = selectedFile.name.slice(((selectedFile.name.lastIndexOf(".") - 1) >>> 0) + 2);
    const fileSize = selectedFile.size;

    if (allowedExtensions.includes(`.${fileExtension}`) && fileSize <= maxSizeInBytes) {
      fileNameDisplay.textContent = selectedFile.name;
    } else {
      fileNameDisplay.textContent = 'Invalid file';
      fileInput.value = ''; // Clear the file input
    }
  } else {
    fileNameDisplay.textContent = 'No file chosen';
  }
});

//back
document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('back');
    const pageDiv = document.getElementById('page-1');
    const candidateDiv = document.getElementById('candidate');
  
    // Initial state: Show 'page' and hide 'candidate'
    pageDiv.style.display = 'block';
    candidateDiv.style.display = 'none';
  
    // Add a click event listener to the button
    backButton.addEventListener('click', function () {
      // Show 'page' and hide 'candidate'
      pageDiv.style.display = 'block';
      candidateDiv.style.display = 'none';
    });
  });


const positionTab = document.getElementById('positionTab');
const positionSection = document.getElementById('positionSection');
positionTab.addEventListener('click', function () {
  // Show the "Position" section
  positionSection.style.display = 'block';

  // Apply CSS styling to highlight the text
  positionTab.style.backgroundColor = 'var(--main-color)';
  positionTab.style.color = 'white';
});

//country selector
const countrySelect = document.getElementById('country');
const citySelect = document.getElementById('city');

// Function to populate countries
function populateCountries() {
  const countries = CountryStateCity.getCountries();
  countries.forEach((country) => {
    const option = document.createElement('option');
    option.value = country.isoCode;
    option.textContent = country.name;
    countrySelect.appendChild(option);
  });
}

// Function to populate cities based on the selected country
