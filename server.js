require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoute");
const cookieSession = require("cookie-session"); // for encryting our id and then sending it to the browser
// note our _id is secret.
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
// use express session middleware
app.use(
    // to ecnrypt our id (in cookie) and then send it to the browser
    // give a name to cookie
    require("express-session")({
        secret: "thisismysessionsecret", // put in env file later
        cookie: { name: "olx-session", maxAge: 1 * 60 * 60 * 1000 },
        resave: true,
        saveUninitialized: false,
    })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session()); // this deserializes the user by calling deserializeUser function

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
