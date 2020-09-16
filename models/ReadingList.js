const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const readingListSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	completedBooks: [
		{
			id: {
				type: Schema.Types.ObjectId,
				ref: "Book",
			},
			name: String,
		},
	],
	currentBooks: [
		{
			id: {
				type: Schema.Types.ObjectId,
				ref: "Book",
			},
			name: String,
		},
	],
	wishListBooks: [
		{
			id: {
				type: Schema.Types.ObjectId,
				ref: "Book",
			},
			name: String,
		},
	],
});

const ReadingList = mongoose.model("ReadingList", readingListSchema);

module.exports = ReadingList;
