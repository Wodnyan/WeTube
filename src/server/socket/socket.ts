import * as io from "socket.io"

export default function sockets(io:io.Server) {
    io.on("connection", (socket) => {
        console.log("User connected")
        socket.on("chat-msg", (msg: string) => {
            socket.broadcast.emit("chat-msg", msg);
        })
    })
}