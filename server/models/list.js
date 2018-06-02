const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('./card').schema;

const ListSchema = new Schema({
	boardId: {
		type: String
	},
	position: Number,
	title: {
		type: String
	},
	description: {
		type: String
	},
	completed: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('List', ListSchema)