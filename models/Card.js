const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const CardSchema = new mongoose.Schema(
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
		list: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'List'
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		activity: [
			{
				message: {
					type: String,
					required: true
				}
			}
		]
	},
	{
		timestamps: true
	}
);

CardSchema.plugin(uniqueValidator);

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;
