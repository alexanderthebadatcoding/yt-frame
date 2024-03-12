// Assuming you are working with the DOM in a browser environment
function createMetaTag(property, content) {
  let metaTag = document.createElement("meta");
  metaTag.setAttribute("property", property);
  metaTag.setAttribute("content", content);
  return metaTag;
}

// Create and append meta tags
document.head.appendChild(createMetaTag("og:image", imageUrl));
document.head.appendChild(createMetaTag("fc:frame:image", imageUrl));
// document.head.appendChild(createMetaTag("og:title", ogTitle));
document.head.appendChild(createMetaTag("og:url", ogUrl));
document.head.appendChild(createMetaTag("fc:frame:button:1:target", ogUrl));

console.log(imageUrl, ogTitle, ogUrl);

// Function to handle the countdown and redirect
function startRedirect() {
  let countdownElement = document.getElementById("countdown");
  let seconds = 5;

  function updateCountdown() {
    countdownElement.textContent = `Redirecting in ${seconds} seconds...`;
    seconds--;

    if (seconds < 0) {
      // Redirect to the desired URL after the countdown
      window.location.href = ogUrl; // Replace with your desired URL
    } else {
      // Call the function again after 1 second
      setTimeout(updateCountdown, 1000);
    }
  }

  // Start the countdown
  updateCountdown();
}

// Call the function when the page loads
window.onload = startRedirect;

// Sample image URLs
const imageUrls = [
  "https://img.youtube.com/vi/" + videoId + "/hq1.jpg",
  "https://img.youtube.com/vi/" + videoId + "/hq2.jpg",
  "https://img.youtube.com/vi/" + videoId + "/hq3.jpg",
];

// Function to preload images
function preloadImages(urls, callback) {
  let loadedImages = 0;
  let imagesArray = [];
  urls.forEach((url, index) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      loadedImages++;
      if (loadedImages === urls.length) {
        callback(imagesArray);
      }
    };
    img.src = url;
    imagesArray[index] = img;
  });
}

// Preload the images
preloadImages(imageUrls, (images) => {
  // Create a new GIF instance
  const gif = new GIF({
    workers: 2,
    quality: 10,
    width: 480,
    height: 360,
  });

  // Add each image to the GIF
  images.forEach((image) => {
    gif.addFrame(image, { delay: 1000 }); // 1000 milliseconds (1 second) delay between frames
  });

  // Render the GIF
  gif.on("finished", (blob) => {
    // Create a download link for the GIF
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "created_gif.gif";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  gif.render();
});
