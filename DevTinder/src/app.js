const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/users");
const app = express();

app.post("/v1/signup", (req, res) => {
    const test = new User({
        firstName: "Dhruv",
        lastName: "Kotwani",
        emailId: "dhruvkotwani@gmail.com",
        password: "123456",
        age: 24,
        gender: "male"
    });
    test.save()
    .then(() => {
        res.send(`User ${test.firstName} added successfully`);
    })
    .catch((err) => {
        res.status(500).send("Failed to add user" + err);
    }
    );
})

connectDB()
.then(() => {
    console.log("Successfully Connected to Database");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
}
)
.catch((err) => {
    console.log("Database Connection Failed" + err);
});