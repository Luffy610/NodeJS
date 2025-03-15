const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/users");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {authRouter} = require("./routes/auth");
const {profileRouter} = require("./routes/profile");
const {userRouter} = require("./routes/user");
const {connectionRequestRouter} = require("./routes/request");

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
app.use("/", connectionRequestRouter);

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