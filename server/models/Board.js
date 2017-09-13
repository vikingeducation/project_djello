const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const List = require('./List');

const BoardSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			unique: true
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
