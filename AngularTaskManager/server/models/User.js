const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is must for registering user"]
    },
    email: {
        type: String,
        required: [true, "user shoudl have an email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    }
})

const User = mongoose.model("user", userSchema);
module.exports = User;