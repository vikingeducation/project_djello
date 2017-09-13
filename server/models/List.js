const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const Card = require('./Card');

const ListSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
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
