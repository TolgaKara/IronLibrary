const express = require("express");
const router = express.Router();

router.get("/books", (req, res, next) => {
	res.render("./dashboard/books", {});
});

router.get("/dashboard", (req, res, next) => {
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
	});
});

module.exports = router;
