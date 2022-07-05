const mongoose = require("mongoose");

//hello !

const userSchema = new mongoose.Schema({
    outlookId: { type: String },
    accesstoken: { type: String }, // outlook oAuth
    email: { type: String },
    name: { type: String },
    password: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    isAdmin: { type: Boolean, default: false },
    phoneNumber: { type: String, required: false },
});

module.exports = mongoose.model("User", userSchema);
