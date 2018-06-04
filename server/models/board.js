const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = require('./list').schema;

const BoardSchema = new Schema({
	_id: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	members: Array
})

module.exports = mongoose.model('Board', BoardSchema)