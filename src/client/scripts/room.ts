const button = document.querySelector(".chat__btn")!;
const chatBox = <HTMLUListElement>document.querySelector(".chat__box")!;
const input = <HTMLInputElement>document.querySelector("#chat__msg")!;
const urlPath = window.location.pathname;
const changeVideoBtn = document.querySelector(".submit-video-btn")!;
const changeVideoInput = <HTMLInputElement>(
    document.querySelector("#submit-video-input")!
);

changeVideoBtn.addEventListener("click", () => {
    try {
        const videoId = getYouTubeId(changeVideoInput.value);
        loadVideo(videoId);
        socket.emit("change video", { urlPath, videoUrl: videoId });
    } catch (err) {
        console.log(err.message);
    }
});

socket.on("change video", (videoUrl: string) => {
    loadVideo(videoUrl);
    startVideo();
});

socket.on("started video", () => {
    startVideo();
});

socket.on("paused video", () => {
    pauseVideo();
});

socket.on("connect", () => {
    //Change this back
    // const username = prompt("Add a username");
    socket.emit("subscribe", { urlPath, username: "foo" });
});

socket.on("chat message", (msg: string) => {
    addChatNode(msg, chatBox);
});

button.addEventListener("click", (e) => {
    const chatMsg = input.value.toString();
    addChatNode(chatMsg, chatBox);
    socket.emit("chat message", { chatMsg, urlPath });
    input.value = "";
});

function getYouTubeId(url: string) {
    const youtubeUrlRegE = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(youtubeUrlRegE);
    if (!match) {
        throw new Error(
            "Not a valid YouTube link or not supported link format"
        );
    }
    return match[2];
}

function addChatNode(msg: string, parentNode: HTMLUListElement) {
    const node = document.createElement("li");
    node.textContent = msg;
    parentNode.appendChild(node);
}
