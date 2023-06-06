
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const imageContainer = document.getElementById('image-container');
const notificationPopup = document.getElementById('notification-popup');

searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  if (query) {
    searchImages(query);
  }
});

function searchImages(query) {
  const apiKey = 'gRXKInBeSW4jxjADNCPdXUFRmV4G4OXWN7YBWMjWefbcJhHU4Bxl1mda'; // Replace with your API key
  const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=9`;

  fetch(apiUrl, {
    headers: {
      Authorization: apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      return response.json();
    })
    .then(data => {
      const images = data.photos;
      showImages(images);
      showNotificationPopup('success', 'Images found successfully');
    })
    .catch(error => {
      console.error('Error:', error);
      showNotificationPopup('error', 'Failed to fetch images');
    });
}

function showImages(images) {
  imageContainer.innerHTML = '';

  images.forEach(image => {
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';

    const img = document.createElement('img');
    img.src = image.src.large;
    img.alt = image.photographer;

    imageItem.appendChild(img);
    imageContainer.appendChild(imageItem);
  });
}

function showNotificationPopup(type, message) {
  const popupContainer = document.createElement('div');
  popupContainer.className = `notification-popup ${type}`;
  popupContainer.innerHTML = message;

  notificationPopup.appendChild(popupContainer);
  notificationPopup.style.display = 'block';

  setTimeout(() => {
    popupContainer.remove();
    notificationPopup.style.display = 'none';
  }, 3000);
}