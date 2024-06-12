const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/userdata");
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:Number,
    date: Date,
    startTime: String,
    endTime: String
})

module.exports = mongoose.model("users", userSchema);