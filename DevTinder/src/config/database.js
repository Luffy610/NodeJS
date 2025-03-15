const mongoose = require('mongoose');
require('dotenv').config({path: `.env.dev`});

const connectDB = async () =>  {
    console.log("Connecting to the database....");
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = connectDB;