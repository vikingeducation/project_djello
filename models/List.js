const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const ListSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		description: {
			type: String,
			required: true
		},
		board: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Board'
		},
		cards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Card'
			}
		]
	},
	{
		timestamps: true
	}
);

ListSchema.plugin(uniqueValidator);

const List = mongoose.model('List', ListSchema);
module.exports = List;
