const jwt = require('jsonwebtoken');
const User = require('../models/users');

const userAuth = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        const decoded =  await jwt.verify(token, "DevTinder@0512");
        req.user = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }

}

module.exports = {userAuth};