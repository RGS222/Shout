import express from "express";
import { add, read, update, deleteData } from "./dataFunc.js";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    read();
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs", {
        buttonText:"Post"
    });
});

app.get("/read", (req, res) => {
    const data = read();
    res.render("read.ejs", {
        allData:data
    });
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post("/post", (req, res) => {
    res.render("create.ejs", {
        submitted: "true"
    });

    add(req.body);
});

app.get("/update", (req, res) => {
    const data = read();
    const item = data.find(i => i.id == req.query.id);

    res.render("update.ejs", {
        post:{id:item.id, name:item.name, password:"", message:item.message},
        buttonText:"Update"
    });
});

app.post("/update", (req, res) => {
    const data = read();
    const itemToUpdate = data.find(item => item.id == req.body.id)

    const errMsg = update(itemToUpdate.id, req.body);
    console.log("errMsg:" + errMsg);
    if (errMsg) {
        res.render("update.ejs", {
            updated: false
        });
    } else {
        res.render("update.ejs", {
            updated: true
        });
    }
});

app.listen(port, () => {
    console.log(`Server is listening to port ${port}.`);
});
