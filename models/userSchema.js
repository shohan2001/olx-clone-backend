const mongoose = require("mongoose");

//hello !

const userSchema = new mongoose.Schema({
    userName: String,
});

module.exports = mongoose.model("User", userSchema);
