const express = require("express");
const router = express.Router();
const middlewares = require("./middlewares");
const Book = require("../models/Book");
const { uploader, cloudinary } = require("../config/cloudinary.config");

const Author = require("../models/Author");

router.get("/books", (req, res) => {
	// get all the books
	Book.find().then((booksFromDB) => {
		console.log(booksFromDB);
		// render a view and pass in the books
		// console.log(booksFromDB);
		res.render("books", { booksList: booksFromDB });
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
			console.log(bookFromDB);
			res.render("bookDetails", { book: bookFromDB });
		});
});

router.post("/books", uploader.single("image"), (req, res) => {
	const imgName = req.file.originalname;
	const imgPath = req.file.url;
	const imgPublicId = req.file.public_id;

	const { title, author, description, rating } = req.body;

	Book.create({
		title: title,
		author: author,
		imgName,
		imgPath,
		imgPublicId,
		description: description,
		rating: rating,
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

module.exports = router;
