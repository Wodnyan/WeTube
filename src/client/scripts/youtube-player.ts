const socket = io();
// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player: YT.Player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        videoId: "M7lc1UVf-VE",
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event: YT.PlayerEvent) {
    event.target.playVideo();
    console.log("Ready");
}
function onPlayerStateChange(event: YT.PlayerEvent) {
    switch (event.data) {
        case 1:
            socket.emit(
                "started video",
                window.location.pathname,
                event.target.getCurrentTime()
            );
            break;
        case 2:
            socket.emit("paused video", window.location.pathname);
            break;
        default:
            console.log(event.data);
    }
}

socket.on("change video", (videoId: string) => {
    console.log("Changed video");
    player.loadVideoById(videoId);
    // player.playVideo();
});

socket.on("started video", (timeElapsed: number) => {
    console.log("Started");
    player.seekTo(timeElapsed, false);
    player.playVideo();
});

socket.on("paused video", () => {
    console.log("Paused");
    player.pauseVideo();
});
