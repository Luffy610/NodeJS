const express = require('express');
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const {validateSignupData, validateLoginData} = require("../utils/validation");
const User = require("../models/users");

authRouter.post("/v1/signup", (req, res) => {
    try {
        validateSignupData(req.body);
    } catch (err) {
        return res.status(400).send(err.message);
    }
    const {firstName, lastName, emailId, password, age, gender} = req.body;
    const passwordHash = bcrypt.hashSync(password, 12);
    const user = new User(
        {
            firstName, 
            lastName, 
            emailId, 
            password: passwordHash, 
            age, 
            gender
        });
    user.save()
    .then(() => {
        res.send(`User ${user.firstName} added successfully`);
    })
    .catch((err) => {
        res.status(500).send("Failed to add user" + err);
    }
    );
})


authRouter.post("/v1/login", async (req, res) => {
    try {
        validateLoginData(req.body);
    }
    catch (err) {
        return res
        .status(400)
        .send(err.message);
    }
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId:emailId});
    if (!user) {
        return res.status(404).send("User not found");
    }
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).send("Invalid Password");
    }

    const token = await user.getJWT();
    res.cookie("token", token);
    res.send("Login Successful");
});

authRouter.post("/v1/logout", async (req, res) => {
    res.clearCookie("token");
    res.send("Logout Successful");
});

module.exports = {authRouter};
