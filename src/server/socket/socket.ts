import * as io from "socket.io"

export default function sockets(io:io.Server) {
    io.on("connection", (socket) => {

        socket.on("chat-msg", ({chatMsg, urlPath}) => {
            // socket.broadcast.emit("chat-msg", msg);
            console.log(chatMsg, urlPath)
            socket.broadcast.to(urlPath).emit("chat-msg", chatMsg);
        })

        socket.on("subscribe", (roomId: string) => {
            console.log("Joining room: " + roomId);
            socket.join(roomId)
        })
    })
}