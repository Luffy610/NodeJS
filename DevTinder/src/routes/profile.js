const express = require('express');
const profileRouter = express.Router();
const User = require("../models/users");
const {userAuth} = require("../middleware/user_auth");

profileRouter.get("/v1/profile", userAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).send("User not found!");
        }
        res.status(200).send(user);
    }
    catch (err) {
        res.status(401).send("Unauthorized" + err);
    }
});

profileRouter.delete("/v1/profile", userAuth, (req, res) => {
    User.findByIdAndDelete(req.user)
    .then((user) => {
        if (!user){
            return res.status(404).send("User not found!");
        }
        res.send("User deleted successfully");
    })
    .catch((err) => {
        res.status(500).send("Failed to delete user" + err);
    }
    );
});

profileRouter.patch("/v1/profile", userAuth, (req, res) => {
    User.findByIdAndUpdate
    (req.user, req.body, {new: true})
    .then((user) => {
        if (!user){
            return res.status(404).send("User not found!");
        }
        res.send(user);
    })
    .catch((err) => {
        res.status(500).send("Failed to update user" + err);
    }
    );
});

module.exports = {profileRouter};