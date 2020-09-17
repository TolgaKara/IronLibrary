const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

/* GET home page */
router.get("/signup", (req, res, next) => {
	res.render("./auth/signup");
});

router.get("/login", (req, res, next) => {
	res.render("./auth/login");
});

// router.get("/firstSignin", (req, res, next) => {
// 	res.render("firstSignin")
// })

router.get("/github", passport.authenticate("github"));

router.get(
	"/auth/github/callback",
	passport.authenticate("github", {
		successRedirect: "/dashboard",
		failureRedirect: "/login",
	})
);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), function (
	req,
	res
) {
	//console.log(req);
	res.redirect("/dashboard");
});

router.post("/signup", (req, res, next) => {
	const { email, password } = req.body;
	console.log(email);
	if (password.length < 8) {
		res.render("signup", { message: "Your password needs to be 8 chars min" });
		return;
	}
	if (email === "") {
		res.render("signup", { message: "Your email cannot be empty" });
		return;
	}
	User.findOne({ email: email }).then((found) => {
		if (found !== null) {
			res.render("signup", { message: "This email is already taken" });
		} else {
			const salt = bcrypt.genSaltSync();
			const hash = bcrypt.hashSync(password, salt);

			User.create({
				email: email,
				password: hash,
			}).then((dbUser) => {
				res.redirect("/login");
			});
		}
	});
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/login",
		passReqToCallBack: true,
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	console.log("Logout works", req.user);
	res.redirect("/");
});

module.exports = router;
