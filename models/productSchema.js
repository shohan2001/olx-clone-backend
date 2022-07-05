const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    postedDate: {
        type: Date,
        required: true,
    },
    description: String,
    location: String,
    sellerID: {
        type: String,
        required: true,
    },
    sellerName: {
        type: String,
        required: true,
    },
    sellerPhoneNumber: {
        type: String,
        required: true,
    },
    images: Array,
    sold: Boolean,
});

module.exports = mongoose.model("product", productSchema);
