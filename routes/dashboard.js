const express = require("express");
const router = express.Router();
const middlewares = require("./middlewares");
const ReadingList = require("../models/ReadingList");

/* router.get("/books", (req, res, next) => {
	res.render("./dashboard/books", {});
}); */

router.get("/dashboard", (req, res, next) => {
	ReadingList.create({ userId: req.user._id }, function (err, small) {
		if (err) return handleError(err);
	});

	/* let currentUserID = req.user._id; */

	/* ReadingList.find(currentUserID).then((userReadingList) => {
		console.log(userReadingList);
	}); */

	let completedBooks = { name: "ExampleNameCompleted", path: "ExamplePathCompleted" };
	let currentBooks = { name: "ExampleNameCurrent", path: "ExamplePathCurrent" };
	let wishListBooks = { name: "ExampleNameWishList", path: "ExamplePathWishList" };
	let completedLength = 0;
	let currentLength = 0;
	let wishListLength = 0;

	res.render("./dashboard/dashboard", {
		completedBooks,
		currentBooks,
		wishListBooks,
		completedLength,
		currentLength,
		wishListLength,
		currentUser: req.user,
	});
});

module.exports = router;
