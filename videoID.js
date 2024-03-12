// Example URL
let urlString;
// index.html?url=some_value

// Create a URL object
let url = new URL(window.location.href);
// Use window.location.href as the base URL

// Get the value of the 'v' parameter
let videoId = url.searchParams.get("v");
console.log(videoId); // Output: 9Stt4wq3KCE
const vidIMG = videoId;
sessionStorage.setItem('vidIMG', videoId);


let imageUrl = "https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg";
let ogTitle = "Watch on Youtube";
let ogUrl = "https://www.youtube.com/watch?v=" + videoId;
