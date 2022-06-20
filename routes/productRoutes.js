const express = require("express");
const router = express.Router();
const {
    productGet,
    productPost,
} = require("../controllers/productController.js");

router.get("/", productGet);

router.post("/", productPost);

module.exports = router;
