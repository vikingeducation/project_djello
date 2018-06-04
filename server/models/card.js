const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	_id: {
		type: String,
		required: true
	},
	listId: {
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
	},
	members: Array,
	activity: Array
})

module.exports = mongoose.model('Card', CardSchema)