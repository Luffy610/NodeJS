const express = require('express');
const userRouter = express.Router();
const User = require("../models/users");
const { userAuth } = require('../middleware/user_auth');
const { ConnectionRequest } = require('../models/connectionRequest');
const connectionRequest = require('../models/connectionRequest');

userRouter.get("/v1/user/feed", userAuth, (req, res) => {
    User.find()
    .then((users) => {
        res.send(users);
    })
    .catch((err) => {
        res.status(500).send("Failed to fetch users" + err);
    }
    );
});

userRouter.get("/v1/user/requests", userAuth, async(req, res) => {
    const loggedInUser = req.user;
    const requests = await connectionRequest.find({receiver: loggedInUser, status: 'intrested'}).populate('sender', 'firstName lastName');

    res.json({message: "Requests fetched successfully", requests});
});

userRouter.get("/v1/user/connections", userAuth, async(req, res) => {
    const loggedInUser = req.user;
    const connections = await connectionRequest.find({
        $or: [
            {sender: loggedInUser, status: 'accepted'},
            {receiver: loggedInUser, status: 'accepted'}
        ]
    }).populate('sender', 'firstName lastName')
    .populate('receiver', 'firstName lastName');

    res.json({message: "Connections fetched successfully", connections});
});
module.exports = {userRouter};