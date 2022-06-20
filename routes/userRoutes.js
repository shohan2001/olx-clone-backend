const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json("Get list of all");
});

router.post("/", (req, res) => {
    res.status(200).json("post");
});

module.exports = router;
