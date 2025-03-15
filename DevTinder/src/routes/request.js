const express = require('express');
const connectionRequestRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/users");
const { userAuth } = require('../middleware/user_auth');

connectionRequestRouter.post("/v1/connectionRequest/send/:status/:recieverId", userAuth, async (req, res) => {
    try {
        const senderId = req.user;
        const recieverId = req.params.recieverId;
        const status = req.params.status;
        const allowedStatus = ['ignored', 'intrested'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" + status });
            
        }

        const reciever = await User.findById(recieverId);
        if (!reciever) {
            return res.status(400).json({ message: "Reciever not found" });
        }
        const existingRequest = await connectionRequest.findOne({
            $or: [
                { sender: senderId, receiver: recieverId },
                { sender: recieverId, receiver: senderId }
            ],
        });
        if (existingRequest) {
            return res.status(400).json({ message: "Request already exists" });
            
        }

        const connectionreq = new connectionRequest({
            sender: senderId,
            receiver: recieverId,
            status: status
        });
        await connectionreq.save();
        res.status(201).send(connectionreq);
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = { connectionRequestRouter };