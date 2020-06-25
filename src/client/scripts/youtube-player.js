const socket = io();
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");
const windowWidth = window.innerWidth * 0.7;
const windowHeight = window.innerHeight * 0.7;

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: windowHeight,
        width: windowWidth,
        videoId: "M7lc1UVf-VE",
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === 1) {
        socket.emit("started video", window.location.pathname);
    } else if (event.data === 2) {
        socket.emit("paused video", window.location.pathname);
    }
}

//Made functions so that
//TS doesn't yell at me
function loadVideo(id) {
    player.loadVideoById(id);
}
function startVideo() {
    player.playVideo();
}
function pauseVideo() {
    player.pauseVideo();
}
