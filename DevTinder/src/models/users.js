const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLenght: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        trim: true,
        minLenght: 4,
        maxLength: 50
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    gender: {
        type: String,
        required: true,
        enum:{
            values: ['male', 'female'],
            message: '{VALUE} is not valid gender type'
        }
    }
});

userSchema.methods.getJWT = async function(){

    const user = this;
    const token = await jwt.sign({userId: user._id}, "DevTinder@0512", {expiresIn: "7d"});
    return token;
};

userSchema.methods.comparePassword = async function(password){
    const user = this;
    const isMatch = await bcrypt.compareSync(password, user.password);
    return isMatch;
}
module.exports = mongoose.model("User", userSchema);