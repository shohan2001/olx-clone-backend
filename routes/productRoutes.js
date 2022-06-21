const express = require("express");
const router = express.Router();
const {
    productGet,
    productPost,
    productGetById,
    productDeleteById,
    productUpdateById,
} = require("../controllers/productController.js");

router.get("/", productGet);

router.post("/", productPost);

router.get("/:id", productGetById);

router.delete("/:id", productDeleteById);

router.put("/:id", productUpdateById);

module.exports = router;
