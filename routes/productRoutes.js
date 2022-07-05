const express = require("express");
const router = express.Router();
const {
    productGet,
    productPost,
    productGetById,
    productDeleteById,
    productUpdateById,
    productGetByCategory,
} = require("../controllers/productController.js");

router.get("/", productGet);
router.get("/category/:id", productGetByCategory);

router.post("/sell", productPost);

router.get("/:id", productGetById);

router.delete("/:id", productDeleteById);

router.put("/update/:id", productUpdateById);

module.exports = router;
