const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Namaste!!");
});

app.get("/hello", (req, res) => {
    res.send("Hello Hello");
});

app.get("/test", (req, res) => {
    res.send("Helloo From the server");
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000....")
});