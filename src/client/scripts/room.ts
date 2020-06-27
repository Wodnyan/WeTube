const chatBtn = document.querySelector(".chat__btn")!;
const chatBox = <HTMLUListElement>document.querySelector(".chat__box")!;
const input = <HTMLInputElement>document.querySelector(".chat__msg")!;
// TODO: Make the ENTER work on chat
const chatForm = <HTMLInputElement>document.querySelector(".chat-form")!;
const urlPath = window.location.pathname;
const changeVideoBtn = document.querySelector(".submit-video__btn")!;
const changeVideoInput = <HTMLInputElement>(
    document.querySelector("#submit-video__input")!
);

let chatBoxHeight = chatBox.scrollHeight;
function scrollDown(htmlElement: HTMLElement, htmlElementHeight: number) {
    htmlElement.scrollTo(0, htmlElementHeight);
}

let username: string = "foo";

document.title = urlPath;

changeVideoBtn.addEventListener("click", () => {
    try {
        const videoId = getYouTubeId(changeVideoInput.value);
        socket.emit("change video", urlPath, videoId);
        player.loadVideoById(videoId);
    } catch (err) {
        console.log(err.message);
    }
});

socket.on("connect", () => {
    // username = prompt("Add a username")!;
    console.log("Hello world");
    socket.emit("subscribe", urlPath, username);
});

socket.on("chat message", (chatMsg: string, username: string) => {
    addChatNode(username, chatMsg, true, chatBox);
    scrollDown();
});

chatBtn.addEventListener("click", (e) => {
    const chatMsg = input.value.toString();
    addChatNode(username, chatMsg, false, chatBox);
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
    foreign: boolean,
    parentNode: HTMLUListElement
) {
    parentNode.insertAdjacentHTML(
        "beforeend",
        `
            <li class="${
                foreign
                    ? "chat__box-item chat__box-item--recieved"
                    : "chat__box-item chat__box-item--sent"
            }">
                ${foreign ? `${username}: ` : ""} ${message}
            </li>
        `
    );
}

function appendErrorMessage(message: string, parentNode: HTMLElement) {
    //Error handling here
}
