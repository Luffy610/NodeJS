const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);