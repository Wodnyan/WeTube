import * as express from "express";

export default function routes(app: express.Application) {
    app.get("/", (req, res) => {
        res.render("index");
    });
    app.get("/room/:id", (req, res) => {
        res.render("room");
    });
}
