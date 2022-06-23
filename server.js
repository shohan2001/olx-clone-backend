require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/product", productRoutes);
app.use("/", authRoutes);

mongoose.connect(process.env.MONGO_URI).then(
    app.listen(process.env.PORT || 5000, () => {
        console.log("Connected");
    })
);
