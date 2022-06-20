const Product = require("../models/productSchema");
const productGet = async (req, res) => {
    try {
        const productList = await Product.find();
        res.status(200).json(productList);
    } catch (err) {
        res.status(500).send(err);
    }
};

const productPost = (req, res) => {
    const productDetails = req.body;
    const newProduct = new Product({
        title: productDetails.title,
        price: productDetails.price,
        description: productDetails.description,
        location: productDetails.location,
        images: productDetails.images,
        sold: false,
    });
    newProduct.save();
    res.send("got the data");
};

module.exports = { productGet, productPost };
