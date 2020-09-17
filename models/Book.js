const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
	title: String,
	description: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "Author", // 'Author is the name of the model
	},
	imgName: {
		type: String,
		default: "",
	},
	imgPath: {
		type: String,
		default: "",
	},
	imgPublicId: {
		type: String,
		default: "",
	},
	reviews: [
		{
			user: String,
			comments: String,
		},
	],
	rating: Number,
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
