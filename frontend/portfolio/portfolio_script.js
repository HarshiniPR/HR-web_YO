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
