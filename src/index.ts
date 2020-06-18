import express from "express"
import routes from "./server/routes/routes"

const app = express();
const PORT = 3000;

app.set("view engine", "ejs")

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

routes(app)