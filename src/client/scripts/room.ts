const socket = io();
const button = document.querySelector("button")!;
const chatBox = <HTMLUListElement>document.querySelector(".chat-box")!;
const input = <HTMLInputElement>document.getElementById("chat-msg")!;

button.addEventListener("click", (e) => {
    const chatMsg = input.value.toString();
    console.log(typeof chatMsg)
    addChatNode(chatMsg, chatBox);
    socket.emit("chat-msg", chatMsg)
    input.value = "";
})

socket.on("chat-msg", (msg: string) => {
    addChatNode(msg, chatBox);
})

function addChatNode(msg: string, parentNode: HTMLUListElement) {
    const node = document.createElement("li");
    node.textContent = msg;
    parentNode.appendChild(node);
}