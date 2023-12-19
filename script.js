const imageInput = document.getElementById('imageInput');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const croppedImage = document.getElementById('croppedImage');


    const brightnessSlider = document.getElementById('brightness');
    const brightnessValueElement = document.getElementById('brightnessValue');
    const contrastSlider = document.getElementById('contrast');
    const contrastValueElement = document.getElementById('contrastValue');
    const saturationSlider = document.getElementById('saturation');
    const saturationValueElement = document.getElementById('saturationValue');
    const grayscaleSlider = document.getElementById('grayscale');
    const grayscaleValueElement = document.getElementById('grayscaleValue');
    const vignetteSlider = document.getElementById('vignette');
    const vignetteValueElement = document.getElementById('vignetteValue');
    const shadowsSlider = document.getElementById('shadows');
    const shadowsValueElement = document.getElementById('shadowsValue');
    const highlightsSlider = document.getElementById('highlights');
    const highlightsValueElement = document.getElementById('highlightsValue');
    const exposureSlider = document.getElementById('exposure');
    const exposureValueElement = document.getElementById('exposureValue');
    const warmthSlider = document.getElementById('warmth');
    const warmthValueElement = document.getElementById('warmthValue');

    const undoButton = document.getElementById('undoButton');

    const cropImageButton = document.getElementById('cropImage');
    const cropSelector = document.getElementById('cropSelector');
    const cropButton = document.getElementById('cropButton');
    const cancelCropButton = document.getElementById('cancelCrop');
    const saveCroppedButton = document.getElementById('saveCroppedButton');

    

    const rotateLeftButton = document.getElementById('rotateLeft');
    const rotateRightButton = document.getElementById('rotateRight');
    const flipHorizontalButton = document.getElementById('flipHorizontal');
    const flipVerticalButton = document.getElementById('flipVertical');
    const resetButton = document.getElementById('reset');
    const saveButton = document.getElementById('save');


    let initialBrightness = 100;
    let initialContrast = 100;
    let initialSaturation = 100;
    let initialGrayscale = 0;
    let initialRotation = 0;
    let isFlippedHorizontal = false;
    let isFlippedVertical = false;
    let initialVignette=0;
    let initialExposure=100;
    let initialHighlights=0;
    let initialShadows=0;
    let initialWarmth=0;

    let changesHistory = [];


    
 
    

    imageInput.addEventListener('change', (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          imagePreviewContainer.style.display = 'flex';
        };
        reader.readAsDataURL(file);
      } else {
        imagePreviewContainer.style.display = 'none';
      }
    });

    brightnessSlider.addEventListener('input', () => {
      currentBrightness = brightnessSlider.value;
      updateFilter();
    });

    contrastSlider.addEventListener('input', () => {
      currentContrast = contrastSlider.value;
      updateFilter();
    });

    saturationSlider.addEventListener('input', () => {
      currentSaturation = saturationSlider.value;
      updateFilter();
    });

    grayscaleSlider.addEventListener('input', () => {
      currentGrayscale = grayscaleSlider.value;
      updateFilter();
    });
    vignetteSlider.addEventListener('input', () => {
      updateFilter();
    });

    shadowsSlider.addEventListener('input', () => {
      updateFilter();
    });

    highlightsSlider.addEventListener('input', () => {
      updateFilter();
    });

    exposureSlider.addEventListener('input', () => {
      updateFilter();
    });

    warmthSlider.addEventListener('input', () => {
      updateFilter();
    });

    rotateLeftButton.addEventListener('click', () => {
      currentRotation -= 90;
      updateRotation();
    });

    rotateRightButton.addEventListener('click', () => {
      currentRotation += 90;
      updateRotation();
    });

    flipHorizontalButton.addEventListener('click', () => {
        isFlippedHorizontal = !isFlippedHorizontal;
        updateFlip();
    });
  
    flipVerticalButton.addEventListener('click', () => {
        isFlippedVertical = !isFlippedVertical;
        updateFlip();
    });

    resetButton.addEventListener('click', () => {
        resetChanges();
      });

      let currentBrightness = 100;
      let currentContrast = 100;
      let currentSaturation = 100;
      let currentGrayscale = 0;
      let currentWarmth = 0; // New variable for warmth
      let currentRotation = 0;
      let currentCropRatio = 'free';
      let cropper;



    function updateFilter() {
      const currentBrightness = brightnessSlider.value;
      const currentContrast = contrastSlider.value;
      const currentSaturation = saturationSlider.value;
      const currentGrayscale = grayscaleSlider.value;
      const currentShadows = shadowsSlider.value;
      const currentHighlights = highlightsSlider.value;
      const currentVignette = vignetteSlider.value;
      const currentExposure = exposureSlider.value;
      const currentWarmth = warmthSlider.value; // New value for warmth

      imagePreview.style.filter = `brightness(${currentBrightness}%) ` +
        `contrast(${currentContrast}%) ` +
        `saturate(${currentSaturation}%) ` +
        `grayscale(${currentGrayscale}%) ` +
        `drop-shadow(${currentShadows}px ${currentShadows}px ${currentShadows}px black) ` +
        `sepia(${currentHighlights}%) ` +
        `sepia(${currentVignette}%) ` +
        `brightness(${currentExposure >= 0 ? currentExposure : 200}%) ` +
        `hue-rotate(${currentWarmth}deg) ` // New warmth adjustment

      brightnessValueElement.textContent = `${currentBrightness}%`;
      contrastValueElement.textContent = `${currentContrast}%`;
      saturationValueElement.textContent = `${currentSaturation}%`;
      grayscaleValueElement.textContent = `${currentGrayscale}%`;
      shadowsValueElement.textContent = `${currentShadows}%`;
      highlightsValueElement.textContent = `${currentHighlights}%`;
      vignetteValueElement.textContent = `${currentVignette}%`;
      exposureValueElement.textContent = `${currentExposure}%`;
      warmthValueElement.textContent = `${currentWarmth}°`; // New warmth value display
    }

    function updateRotation() {
      imagePreview.style.transform = `rotate(${currentRotation}deg)`;
    }

    function updateFlip() {
        const flipValue = (isFlippedHorizontal ? "scaleX(-1)" : "") + " " + (isFlippedVertical ? "scaleY(-1)" : "");
        imagePreview.style.transform = `rotate(${currentRotation}deg) ${flipValue}`;
    }
    
    




    //FOR CROPPER


    // Event listener for image input change
    imageInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
    
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          imagePreviewContainer.style.display = 'block';
          // Destroy previous Cropper instance if exists
          if (cropper) {
            cropper.destroy();
          }
        };
        reader.readAsDataURL(file);
      } else {
        imagePreviewContainer.style.display = 'none';
        if (cropper) {
          cropper.destroy();
        }
      }
    });
    
    // Event listener for the "Crop Image" button
    cropImageButton.addEventListener('click', () => {
      // Enable the Cropper when the button is clicked
      enableCropper();
    
      // Add any additional logic you need when the "Crop Image" button is clicked
    });
    
    // Event listener for the "Crop" button
    cropButton.addEventListener('click', () => {
      // Get the cropped image data URL
      const croppedImageData = cropper.getCroppedCanvas().toDataURL();
    
      // Display the cropped image in the Bootstrap modal
      const modalBody = document.getElementById('modalBody');
      modalBody.innerHTML = '';
      const croppedImage = document.createElement('img');
      croppedImage.src = croppedImageData;
      modalBody.appendChild(croppedImage);
    
      // Show the Bootstrap modal
      $('#cropModal').modal('show');
    
      // Enable the Crop button again (comment out or remove the following line if you want to keep it enabled)
      cropButton.disabled = false;
    });
    
    // Event listener for the "Save Cropped" button
    saveCroppedButton.addEventListener('click', () => {
      if (cropper) {
        // Get the cropped image data URL
        const croppedImageData = cropper.getCroppedCanvas().toDataURL();
    
        // Replace the original image source with the cropped image
        imagePreview.src = croppedImageData;
    
        // Display the cropped image in the Bootstrap modal
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = ''; // Clear the modal body
        const croppedImage = new Image();
        croppedImage.src = croppedImageData;
        croppedImage.classList.add('img-fluid'); // Add Bootstrap class for responsive images
        modalBody.appendChild(croppedImage);
    
        // Show the Bootstrap modal
        $('#cropModal').modal('show');
    
        // Enable the Crop button again (comment out or remove the following line if you want to keep it enabled)
        cropButton.disabled = false;
    
        // Destroy the Cropper instance if you no longer need it
        cropper.destroy();
        cropper = null;
      }
    });
    
    // Event listener for the "Cancel" button
    cancelCropButton.addEventListener('click', () => {
      if (cropper) {
        // Close and destroy the Cropper instance
        cropper.destroy();
        cropper = null;
    
        // Hide the image preview container
        imagePreviewContainer.style.display = 'none';
    
        // Optionally, you can reset the input file
        imageInput.value = '';
    
        // Enable the Crop button again
        cropButton.disabled = false;
      }
    });
    
    // Function to enable the Cropper
function enableCropper() {
  // Destroy previous Cropper instance if exists
  if (cropper) {
    cropper.destroy();
  }

  // Initialize Cropper.js with the image
  cropper = new Cropper(imagePreview, {
    aspectRatio: getAspectRatio(), // Set initial aspect ratio
    viewMode: 2, // Set to 2 to restrict the cropping box to within the canvas
  });

  // Show the crop selector
  cropSelectorWrapper.style.display = 'block';
}

// Event listener for the crop selector change
cropSelector.addEventListener('click', () => {
  // Update the Cropper aspect ratio based on the selected option
  const selectedOption = document.querySelector('.custom-option.selected');
  const selectedRatio = selectedOption.getAttribute('value');

  if (selectedRatio === 'free') {
    // Set the aspect ratio to NaN for free crop
    cropper.setAspectRatio(NaN);
  } else {
    // Set the aspect ratio based on the selected option
    const [width, height] = selectedRatio.split(':').map(Number);
    cropper.setAspectRatio(width / height);
  }
});
    
    // Function to get the aspect ratio based on the selected crop type
    function getAspectRatio() {
      const selectedRatio = cropSelector.value;
      switch (selectedRatio) {
        case 'square':
          return 1 / 1;
        case '4:5':
          return 4 / 5;
        case '5:4':
          return 5 / 4;
        case '16:9':
          return 16 / 9;
        case '9:16':
          return 9 / 16;
        case '4:3':
          return 4 / 3;
        case '3:4':
        return 3 / 4;
        case '3:2':
          return 3 / 2;
        case '2:3':
          return 2 /3;
        default:
          // 'free' or unknown cases
          return NaN;
      }
    }






    
    function resetChanges() {
      // Reset sliders to initial values
      brightnessSlider.value = initialBrightness;
      contrastSlider.value = initialContrast;
      saturationSlider.value = initialSaturation;
      grayscaleSlider.value = initialGrayscale;
      shadowsSlider.value = initialShadows;
      vignetteSlider.value = initialVignette;
      highlightsSlider.value = initialHighlights;
      exposureSlider.value = initialExposure;
      warmthSlider.value = initialWarmth;
    
      // Reset current values to initial values
      currentBrightness = initialBrightness;
      currentContrast = initialContrast;
      currentSaturation = initialSaturation;
      currentGrayscale = initialGrayscale;
      currentRotation = initialRotation;
      currentWarmth = initialWarmth;
    
      // Reset flip flags
      isFlippedHorizontal = false;
      isFlippedVertical = false;
    
      // Apply the reset values to the filters
      updateFilter();
      updateRotation();
      updateFlip();
    
      // Revert to the original image without any cropping
      if (cropper) {
        cropper.reset(); // Reset any cropping
        cropper.clear(); // Clear any existing crops
      }
    
      // Reinitialize Cropper.js with the original image
      if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
    
        reader.onload = function (e) {
          // Set the image source
          imagePreview.src = e.target.result;
    
          // Destroy previous Cropper instance if exists
          if (cropper) {
            cropper.destroy();
          }
            };
    
        reader.readAsDataURL(file);
      }
    }
    




    
        //SAVE BUTTON

      saveButton.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
      
        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.filter = imagePreview.style.filter;
      
          // Apply the same transformations as in the preview
          ctx.setTransform(
            parseFloat(imagePreview.style.transform.split('(')[1].split(')')[0].split(',')[0]),
            0,
            0,
            parseFloat(imagePreview.style.transform.split('(')[1].split(')')[0].split(',')[3]),
            parseFloat(imagePreview.style.transform.split('(')[1].split(')')[0].split(',')[4]),
            parseFloat(imagePreview.style.transform.split('(')[1].split(')')[0].split(',')[5])
          );
      
          ctx.drawImage(img, 0, 0);
      
          // Convert the canvas content to a data URL and trigger download
          const dataURL = canvas.toDataURL();
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'manipulated_image.png';
          link.click();
        };
      
        img.src = imagePreview.src;
      });
      












      //FOR ROTATE, CROP AND FILTER BAR ON CLICK VIEW
      function toggleSection(sectionId) {
        var section = document.querySelector('.' + sectionId);
        section.classList.toggle('show-section');
      
        if (sectionId === 'crop-container' && !section.classList.contains('show-section')) {
          // If the crop-container section is not shown, destroy the Cropper instance
          if (cropper) {
            cropper.destroy();
            cropper = null;
          }
        }
      }
      
      function hideSection(sectionId) {
        var section = document.querySelector('.' + sectionId);
        section.classList.remove('show-section');
      
        if (sectionId === 'crop-container') {
          // If the crop-container section is hidden, destroy the Cropper instance
          if (cropper) {
            cropper.destroy();
            cropper = null;
          }
        }
      }
      
      document.getElementById('filters_open').addEventListener('click', function () {
        console.log('Filters button clicked');
        toggleSection('filter');
        // Hide the crop section when filters are opened
        hideSection('crop-container');
        hideSection('rotate');
      });
      
      document.getElementById('cropImage').addEventListener('click', function () {
        console.log('Crop button clicked');
        toggleSection('crop-container');
        hideSection('filter');
        hideSection('rotate');
      });
      
      // ROTATE BAR OPEN
      document.getElementById('rotate_open').addEventListener('click', function() {
      console.log('Rotate button clicked');
      toggleSection('rotate');

      // Destroy the Cropper instance if it exists
      if (cropper) {
        cropper.destroy();
        cropper = null;
      }
      // Hide other sections when rotate is opened
      hideSection('filter');
      hideSection('crop-container');
      });





      //CUSTOM SLEECT FOR CROP
      document.querySelector('.select-wrapper').addEventListener('click', function() {
      this.querySelector('.select').classList.toggle('open');
      })

      for (const option of document.querySelectorAll(".custom-option")) {
      option.addEventListener('click', function() {
          if (!this.classList.contains('selected')) {
              this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
              this.classList.add('selected');
              this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
          }
      })
      }
      window.addEventListener('click', function(e) {
      const select = document.querySelector('.select')
      if (!select.contains(e.target)) {
          select.classList.remove('open');
      }
      });
