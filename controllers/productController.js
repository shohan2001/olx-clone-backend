const Product = require("../models/productSchema");
const productGet = async (req, res) => {
    try {
        const productList = await Product.find();
        res.json({
            status: "ok",
            data: productList,
        });
    } catch (err) {
        res.json({
            status: "ok",
            message: err.message,
        });
    }
};

const productPost = async (req, res) => {
    const productDetails = req.body;
    const newProduct = new Product({
        title: productDetails.title,
        price: productDetails.price,
        description: productDetails.description,
        location: productDetails.location,
        images: productDetails.images,
        sold: false,
    });
    try {
        await newProduct.save();
        res.status(200).send("successful");
    } catch (err) {
        res.status(500).send(err);
    }
};

const productGetById = async (req, res) => {
    const id = req.params.id;

    try {
        const searchProduct = await Product.findById(id);
        res.status(200).json(searchProduct);
    } catch (err) {
        res.status(500).send(err);
    }
};

const productDeleteById = async (req, res) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).send("successful");
    } catch (err) {
        res.status(500).send(err);
    }
};
const productUpdateById = async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    try {
        await Product.findByIdAndUpdate(id, updatedProduct);
        await Product.save();
        res.status(200).send("updated");
    } catch (err) {
        response.status(500).send(error);
    }
};

module.exports = {
    productGet,
    productPost,
    productGetById,
    productDeleteById,
    productUpdateById,
};
