// Register as an Unsplash developer, create a new app and enter the access key here
const apiKey = 'API_KEY';

const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&topics=wallpapers&count=${count}`;

// Check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

// Helper function to set attrubutes on DOM elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create elements for links and photos, add to DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // Run function for each object in photosArray
  photosArray.forEach(photo => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    if (response.status === 200) {
      photosArray = await response.json();
      displayPhotos();
    } else {
      const errors = await response.json();
      errors.errors.forEach(error => {
        console.error(error);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Check to see if scrolling near bottom of page and load more photos
window.addEventListener('scroll', () => {
  if (ready && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    ready = false;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&topics=wallpapers&count=${count}`;
    getPhotos();
  }
});

// On load
getPhotos();
