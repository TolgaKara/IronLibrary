const express = require("express");
const router = express.Router();
const middlewares = require("./middlewares");
const Book = require("../models/Book");
const { uploader, cloudinary } = require("../config/cloudinary.config");

const Author = require("../models/Author");
const ReadingList = require("../models/ReadingList");

router.get("/books", (req, res) => {
	// get all the books
	Book.find().then((booksFromDB) => {
		console.log(booksFromDB);
		// render a view and pass in the books
		// console.log(booksFromDB);
		res.render("books", { booksList: booksFromDB, currentUser: req.user });
	});
});

router.get("/books/add", (req, res, next) => {
	Author.find()
		.then((authorsFromDB) => {
			res.render("bookForm", { authors: authorsFromDB });
		})
		.catch((error) => {
			next(error);
		});
});

router.get("/books/:bookId", (req, res) => {
	const id = req.params.bookId;

	Book.findById(id)
		.populate("author")
		.then((bookFromDB) => {
			let isUserBook = "" + bookFromDB.userId == "" + req.user._id;
			console.log(isUserBook);
			console.log(bookFromDB);
			res.render("bookDetails", { book: bookFromDB, isUserBook });
		});
});

router.post("/books", uploader.single("image"), (req, res) => {
	let imgName;
	let imgPath;
	let imgPublicId;
	if (req.file !== undefined) {
		imgName = req.file.originalname;
		imgPath = req.file.url;
		imgPublicId = req.file.public_id;
	} else {
		imgName = "Default Image";
		imgPath = "";
		imgPublicId = "";
	}

	const { title, author, description, rating } = req.body;

	Book.create({
		title: title,
		author: author,
		imgName,
		imgPath,
		imgPublicId,
		description: description,
		rating: rating,
		userId: req.user._id,
	})
		.then((book) => {
			console.log(`New book was created: ${book}`);
			//
			res.redirect(`/books/${book._id}`);
		})
		.catch((error) => {
			console.log(error);
		});
});

router.get("/books/edit/:bookId", (req, res, next) => {
	const id = req.params.bookId;
	console.log(id);

	Book.findById(id)
		.populate("author")
		.then((bookFromDB) => {
			// render an edit form with the data from the book
			console.log(bookFromDB);
			res.render("bookEditForm", { book: bookFromDB });
		})
		.catch((error) => {
			next(error);
		});
});

router.get("/books/delete/:bookId", (req, res) => {
	const id = req.params.bookId;
	Book.findByIdAndDelete(id)
		.then(() => {
			res.redirect("/books");
		})
		.catch((error) => {
			console.log(error);
		});
});

router.post("/books/edit/:bookId", (req, res) => {
	const { title, author, description, rating } = req.body;
	const id = req.params.bookId;
	Book.findByIdAndUpdate(id, {
		title: title,
		author: author,
		description: description,
		rating: rating,
	})
		.then((book) => {
			res.redirect(`/books/${book._id}`);
		})
		.catch((error) => {
			console.log(error);
		});
});

router.post("/books/:bookId/reviews", (req, res, next) => {
	const { user, comments } = req.body;
	// const user = req.body.user;
	Book.findByIdAndUpdate(req.params.bookId, {
		$push: {
			reviews: {
				user: user,
				comments: comments,
			},
		},
	})
		.then((book) => {
			res.redirect(`/books/${book._id}`);
		})
		.catch((error) => {
			next(error);
		});
});

router.get("/add/completed/:id", (req, res, next) => {
	const bookId = req.params.id;
	const bookName = Book.findById(bookId).then((buch) => buch.title);
	console.log(bookName);
	const userId = req.user._id;
	ReadingList.findOneAndUpdate(
		{ userId: userId },
		{ $push: { completedBooks: { id: bookId, name: bookName } } }
	)
		.then((list) => {
			res.redirect("/dashboard");
		})
		.catch((err) => {
			console.log(err);
		});
});
router.get("/add/reading/:id", (req, res, next) => {});
router.get("/add/wishlist/:id", (req, res, next) => {});

module.exports = router;
