import * as io from "socket.io"

export default function sockets(io:io.Server) {
    const rooms: {urlPath: string; usernames: string[]}[] = [];

    io.on("connection", (socket) => {

        socket.on("chat message", ({chatMsg, urlPath}) => {
            socket.broadcast.to(urlPath).emit("chat message", chatMsg);
        })

        socket.on("change video", ({urlPath, videoUrl}) => {
            socket.broadcast.to(urlPath).emit("change video", videoUrl)
        })

        socket.on("started video", (urlPath: string) => {
            socket.broadcast.to(urlPath).emit("started video")
        })

        socket.on("paused video", (urlPath: string) => {
            socket.broadcast.to(urlPath).emit("paused video")
        })

        socket.on("subscribe", ({urlPath, username}) => {
            if(rooms.length === 0) {
                rooms.push({urlPath, usernames: [username]})
                socket.join(urlPath)
                // console.log(rooms)
            } else {
                rooms.forEach(room => {
                    if(room.urlPath === urlPath) {
                        room.usernames.push(username)
                    } else {
                        rooms.push({urlPath, usernames: [username]})
                    }
                })
                socket.join(urlPath)
            }
        })
    })
}