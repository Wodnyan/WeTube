const socket = io();
// let socket: SocketIOClient.Socket;
const button = document.querySelector("button")!;
const chatBox = <HTMLUListElement>document.querySelector(".chat-box")!;
const input = <HTMLInputElement>document.getElementById("chat-msg")!;
const urlPath = window.location.pathname;
// window.addEventListener("load", () => {
// 	console.log(window.location.pathname);
// 	socket.emit("join room", window.location.pathname);
// })
socket.on("connect", () => {
	socket.emit("subscribe", urlPath);
})

socket.on("chat-msg", (msg: string) => {
    addChatNode(msg, chatBox);
})

button.addEventListener("click", (e) => {
    const chatMsg = input.value.toString();
    addChatNode(chatMsg, chatBox);
    socket.emit("chat-msg", {chatMsg, urlPath})
    input.value = "";
})


function addChatNode(msg: string, parentNode: HTMLUListElement) {
    const node = document.createElement("li");
    node.textContent = msg;
    parentNode.appendChild(node);
}