const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('./card').schema;

const ListSchema = new Schema({
	_id: {
		type: String,
		required: true
	},
	boardId: {
		type: String,
		required: true
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