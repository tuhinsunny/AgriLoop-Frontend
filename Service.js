// Array of vegetables and fruits with details
const items = [
  { name: "Tomato", price: 10, supercoins: 5, image: "tomato.jpg" },
  { name: "Potato", price: 8, supercoins: 4, image: "potato.jpg" },
  { name: "Carrot", price: 12, supercoins: 6, image: "carrot.jpg" },
  { name: "Cucumber", price: 9, supercoins: 4, image: "cucumber.jpg" },
  { name: "Spinach", price: 15, supercoins: 7, image: "spinach.jpg" },
  { name: "Onion", price: 7, supercoins: 3, image: "onion.jpg" },
  { name: "Apple", price: 15, supercoins: 7, image: "apple.jpg" },
  { name: "Banana", price: 5, supercoins: 2, image: "banana.jpg" },
  { name: "Grapes", price: 20, supercoins: 10, image: "grapes.jpg" },
];

const API_ENDPOINT = "http://socially-evolving-elk.ngrok-free.app/predict";

window.onload = function() {
  const cardsContainer = document.getElementById('cards-container');
  const uploadedImageDiv = document.getElementById('uploaded-image');

  // Generate cards dynamically
  items.forEach((item, index) => {
    createCard(item, index);
  });

  // File upload handling
  const fileUpload = document.getElementById('file-upload');
  const uploadButton = document.getElementById('upload-button');
  const uploadBox = document.getElementById('upload-box');

  uploadButton.onclick = function() {
    fileUpload.click();
  };

  fileUpload.onchange = function() {
    handleFiles(fileUpload.files);
  };

  uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  });

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadBox.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleFiles(files) {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        uploadedImageDiv.innerHTML = ''; // Clear previous content
        uploadedImageDiv.appendChild(img);
        alert('Image uploaded successfully!');

        const formData = new FormData();
        formData.append("file", file);

        fetch(API_ENDPOINT, {
          method: "POST",
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            alert(`Prediction: ${data.prediction}\nConfidence: ${data.confidence}`);
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Failed to get prediction.');
          });
      };
    }
  }

  function createCard(item, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <p>SuperCoins: ${item.supercoins} <span class="supercoin-icon">💰</span></p>
            <input type="number" id="quantity-${index}" name="quantity" min="1" max="10" value="1">
            <button class="icon-button cart-icon" onclick="addToCart(${index})">🛒</button>
            <button class="icon-button heart-icon" onclick="addToFavourite(${index})">❤️</button>
        `;
    cardsContainer.appendChild(card);
  }

  // Function to handle adding an item to the cart
  window.addToCart = function(index) {
    const item = items[index];
    const quantity = document.getElementById(`quantity-${index}`).value;
    alert(`Added ${quantity} ${item.name}(s) to the cart.`);
  };

  // Function to handle adding an item to favourites
  window.addToFavourite = function(index) {
    const item = items[index];
    alert(`${item.name} added to your favourites!`);
  };

  // Camera Functionality
  let videoStream;

  document.getElementById('camera-button').addEventListener('click', () => {
    openCamera();
  });

  function openCamera() {
    const cameraOverlay = document.createElement('div');
    cameraOverlay.id = 'camera-overlay';
    cameraOverlay.style.position = 'fixed';
    cameraOverlay.style.top = '0';
    cameraOverlay.style.left = '0';
    cameraOverlay.style.width = '100vw';
    cameraOverlay.style.height = '100vh';
    cameraOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    cameraOverlay.style.display = 'flex';
    cameraOverlay.style.justifyContent = 'center';
    cameraOverlay.style.alignItems = 'center';
    cameraOverlay.style.zIndex = '1000';

    // Create a video element for live camera feed
    const video = document.createElement('video');
    video.id = 'camera-feed';
    video.width = 640;
    video.height = 480;
    cameraOverlay.appendChild(video);

    // Capture Button
    const captureButton = document.createElement('button');
    captureButton.innerText = 'Capture';
    captureButton.style.position = 'absolute';
    captureButton.style.bottom = '50px';
    captureButton.style.padding = '10px 20px';
    captureButton.style.backgroundColor = '#28a745';
    captureButton.style.color = 'white';
    captureButton.style.border = 'none';
    captureButton.style.borderRadius = '8px';
    captureButton.style.cursor = 'pointer';

    captureButton.addEventListener('click', () => {
      capturePhoto(video);
    });

    cameraOverlay.appendChild(captureButton);

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#d9534f';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '8px';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', () => {
      closeCamera(cameraOverlay);
    });

    cameraOverlay.appendChild(closeButton);
    document.body.appendChild(cameraOverlay);

    // Access device camera and stream to the video element
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        video.play();
        videoStream = stream;
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
        alert("Unable to access camera.");
      });
  }

  // Capture photo from live camera
  function capturePhoto(video) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/png');

    // Display the captured image
    const img = new Image();
    img.src = imageDataUrl;
    uploadedImageDiv.innerHTML = ''; // Clear previous content
    uploadedImageDiv.appendChild(img);

    alert('Photo captured successfully!');
    closeCamera(document.getElementById('camera-overlay'));
  }

  // Close the camera and stop the video stream
  function closeCamera(overlay) {
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach(track => track.stop());
    }
    overlay.remove();
  }
};