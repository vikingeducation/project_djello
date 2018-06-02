const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	listId: {
		type: String,
		required: true
	},
	listName: {
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
	completed: Boolean,
	members: Array,
	activity: Array
})

module.exports = mongoose.model('Card', CardSchema)