const chatBtn = document.querySelector(".chat__btn")!;
const chatBox = <HTMLUListElement>document.querySelector(".chat__box")!;
const input = <HTMLInputElement>document.querySelector(".chat__msg")!;
const urlPath = window.location.pathname;
const changeVideoBtn = document.querySelector(".submit-video-btn")!;
const changeVideoInput = <HTMLInputElement>(
    document.querySelector("#submit-video-input")!
);
let chatBoxHeight = chatBox.scrollHeight;
const scrollDown = () => {
    chatBox.scrollTo(0, chatBoxHeight);
};
let username: string = "foo";

changeVideoBtn.addEventListener("click", () => {
    try {
        const videoId = getYouTubeId(changeVideoInput.value);
        player.loadVideoById(videoId);
        socket.emit("change video", urlPath, videoId);
    } catch (err) {
        console.log(err.message);
    }
});

socket.on("change video", (videoId: string) => {
    player.loadVideoById(videoId);
    player.playVideo();
});

socket.on("started video", (timeElapsed: number) => {
    player.seekTo(timeElapsed, true);
    player.playVideo();
});

socket.on("paused video", () => {
    player.pauseVideo();
});

socket.on("connect", () => {
    // username = prompt("Add a username")!;
    socket.emit("subscribe", { urlPath, username });
});

socket.on("chat message", (chatMsg: string, username: string) => {
    addChatNode(username, chatMsg, chatBox);
    scrollDown();
});

chatBtn.addEventListener("click", (e) => {
    const chatMsg = input.value.toString();
    addChatNode(username, chatMsg, chatBox);
    chatBoxHeight = chatBox.scrollHeight;
    scrollDown();
    socket.emit("chat message", urlPath, chatMsg, username);
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

function addChatNode(
    username: string,
    message: string,
    parentNode: HTMLUListElement
) {
    parentNode.insertAdjacentHTML(
        "beforeend",
        `
            <li>${username}: ${message}</li>
        `
    );
}

function appendErrorMessage(message: string, parentNode: HTMLElement) {}
