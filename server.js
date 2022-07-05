require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoute");
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
// use express session middleware
app.use(
    require("express-session")({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/product", productRoutes);
app.use("/", authRoutes);

mongoose.connect(process.env.MONGO_URI).then(
    app.listen(process.env.PORT || 5000, () => {
        console.log("Connected");
    })
);
