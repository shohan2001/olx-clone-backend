const express = require("express");
const passport = require("passport");
const router = express.Router();
const { authenticate, isLoggedIn } = require("../middleware/index");
const User = require("../models/userSchema");
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
    function (req, res) {
        // Successful authentication
        // res.redirect(CLIENT_HOME_PAGE_URL + "profile");
        res.redirect("/");
    }
);

router.get("/failed", (req, res) => {
    res.status(401).json({
        success: false,
        msg: "user authentication failed",
    });
});
router.get("/success", (req, res) => {
    res.status(200).json({
        success: true,
        msg: "user authentication successful",
    });
});

router.get("/auth/logout", function (req, res) {
    req.session = null;
    req.logout();
    // res.redirect(CLIENT_HOME_PAGE_URL);
    // res.status(200).json({ msg: "Logged out successfully" });
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

module.exports = router;
