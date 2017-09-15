const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const BoardSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		lists: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'List'
			}
		]
	},
	{
		timestamps: true
	}
);

BoardSchema.plugin(uniqueValidator);

const Board = mongoose.model('Board', BoardSchema);
module.exports = Board;
