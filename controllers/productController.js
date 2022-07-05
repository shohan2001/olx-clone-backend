const express = require("express");
const app = express();
app.use(express.json());
const Product = require("../models/productSchema");
const productGet = async (req, res) => {
    try {
        const productList = await Product.find({ sold: false });
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
        category: productDetails.category,
        title: productDetails.title,
        price: productDetails.price,
        description: productDetails.description,
        postedDate: productDetails.date,
        location: productDetails.location,
        images: productDetails.images,
        brand: productDetails.brand,
        sellerID: productDetails.sellerID,
        postedDate: productDetails.postedDate,
        sold: false,
    });
    try {
        await newProduct.save();

        res.status(200).json({ id: newProduct._id });
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

const productGetByCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const productList = await Product.find({ category: id, sold: false });
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
        const currProduct = await Product.findById(id);

        // update currProduct with updatedProduct

        currProduct.sold = updatedProduct.sold;

        if (updatedProduct.title) {
            currProduct.title = updatedProduct.title;
        }
        if (updatedProduct.price) {
            currProduct.price = updatedProduct.price;
        }
        if (updatedProduct.description) {
            currProduct.description = updatedProduct.description;
        }
        if (updatedProduct.location) {
            currProduct.location = updatedProduct.location;
        }
        if (updatedProduct.images) {
            currProduct.images = updatedProduct.images;
        }
        if (updatedProduct.brand) {
            currProduct.brand = updatedProduct.brand;
        }
        if (updatedProduct.postedDate) {
            currProduct.postedDate = updatedProduct.postedDate;
        }
        if (updatedProduct.category) {
            currProduct.category = updatedProduct.category;
        }
        if (updatedProduct.sellerID) {
            currProduct.sellerID = updatedProduct.sellerID;
        }
        await currProduct.save();

        res.status(200).send("successful");
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    productGet,
    productPost,
    productGetById,
    productDeleteById,
    productUpdateById,
    productGetByCategory,
};
