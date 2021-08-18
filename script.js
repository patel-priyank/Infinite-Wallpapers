const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');
const github = document.querySelector('#github');
const scrollToTop = document.querySelector('#scroll-to-top');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
let apiKey = 'AgTvW19wmT8KHWfAqbnh27C1WBCdJrFGqPTDMwosjwc';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&topics=wallpapers&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  ++imagesLoaded;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&topics=wallpapers&count=${count}`;
  }
}

// Helper Function to Set Attributes on DOM ELements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Helper Function for converting 'rem' to 'pixels'
function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// Create Elements for links and photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });

    // Create <img> for photo
    const img = document.createElement('img');

    if (!Boolean(photo.alt_description)) {
      photo.alt_description = 'unsplash image';
    }

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// Check to see if scrolling near bottom of page to load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - convertRemToPixels(75) && ready) {
    ready = false;
    getPhotos();
  }

  scrollToTop.hidden = window.scrollY < convertRemToPixels(100);
});

github.addEventListener('click', () => {
  window.open('https://github.com/patel-priyank/Infinite-Wallpapers');
});

scrollToTop.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// On Load
getPhotos();
