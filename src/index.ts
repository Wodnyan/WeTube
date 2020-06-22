import express from "express";
import io from "socket.io";
import routes from "./server/routes/routes";
import sockets from "./server/socket/socket";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("./dist/client"));

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
sockets(io(server));
routes(app);
