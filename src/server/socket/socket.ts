import * as io from "socket.io";

export default function sockets(io: io.Server) {
    const rooms: { urlPath: string; usernames: string[] }[] = [];

    io.on("connection", (socket) => {
        socket.on(
            "chat message",
            (urlPath: string, chatMsg: string, username: string) => {
                socket.broadcast
                    .to(urlPath)
                    .emit("chat message", chatMsg, username);
            }
        );

        socket.on("change video", (urlPath: string, videoUrl: string) => {
            socket.broadcast.to(urlPath).emit("change video", videoUrl);
        });

        socket.on("started video", (urlPath: string, timeElapsed: number) => {
            socket.broadcast.to(urlPath).emit("started video", timeElapsed);
        });

        socket.on("paused video", (urlPath: string) => {
            socket.broadcast.to(urlPath).emit("paused video");
        });

        socket.on("subscribe", (urlPath: string, username: string) => {
            if (rooms.length === 0) {
                rooms.push({ urlPath, usernames: [username] });
                socket.join(urlPath);
            } else {
                rooms.forEach((room) => {
                    if (room.urlPath === urlPath) {
                        room.usernames.push(username);
                    } else {
                        rooms.push({ urlPath, usernames: [username] });
                    }
                });
                socket.join(urlPath);
            }
        });
    });
}
