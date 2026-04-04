import express from "express";
import { add, read, update, deleteData } from "./dataFunc.js";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/read", (req, res) => {
    console.log("before read");
    read();
    console.log("after read");
    res.render("read.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post("/submit", (req, res) => {
    res.render("create.ejs", {
        submitted: "true"
    });

    add(req.body);
});

app.listen(port, () => {
    console.log(`Server is listening to port ${port}.`);
});
