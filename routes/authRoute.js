const express = require("express");
const passport = require("passport");
const router = express.Router();
const passportSetup = require("../controllers/auth");
const { authenticate, isLoggedIn } = require("../middleware/index");
const User = require("../models/userSchema");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/";
router.get(
    "/auth/outlook",
    passport.authenticate("windowslive", {
        scope: [
            "openid",
            "profile",
            "offline_access",
            "https://outlook.office.com/Mail.Read",
        ],
    })
);

router.get(
    "/auth/outlook/callback",
    passport.authenticate("windowslive", {
        successRedirect: "/success",
        failureRedirect: "/failed",
    }),
    // now we can access the user in the request with req.user (passport gives us this property)
    function (req, res) {
        //  Successful authentication
        res().redirect(CLIENT_HOME_PAGE_URL);
        // res.redirect("/");
    }
);

router.get("/failed", (req, res) => {
    res.status(401).json({
        success: false,
        msg: "user authentication failed",
    });
});
router.get("/success", (req, res) => {
    // res.status(200).json({
    //     success: true,
    //     msg: "user authentication successful",
    // });
    res.cookie("token", "successful");
    res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get("/auth/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect(CLIENT_HOME_PAGE_URL);
    });
});
// ////// USER INFO "PROTECTED" ROUTE

router.get("/user", isLoggedIn, (req, res) => {
    User.findById(req.user.id).exec(function (err, foundUser) {
        if (err) {
            console.log(err);
            return res.status(404).json({ msg: err.message });
        }
        if (foundUser) {
            return res.status(200).json(foundUser);
        }
        return res.status(500).json({ msg: "someting wrong happened" });
    });
});

router.put("/user/update", isLoggedIn, async (req, res) => {
    const id = req.user.id;
    const updatedUser = req.body;
    try {
        const currUser = await User.findById(id);
        currUser.name = updatedUser.name;
        currUser.email = updatedUser.email;
        currUser.phoneNumber = updatedUser.phoneNumber;
        currUser.save();
        res.status(200).json(currUser);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
