const mongoose = require('mongoose');
const List = require('./list');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	_id: {
		type: String,
		required: true
	},
	listId: {
		type: String, 
		ref: 'List',
		required: true
	},
	title: {
		type: String
	},
	description: {
		type: String
	},
	position: Number,
	completed: {
		type: Boolean,
		default: false
	},
	members: Array,
	activity: Array
})

CardSchema.pre('remove', function(next) {
	this.model('List').update({ cards: this._id }, { $pull: { cards: this._id } }, next)
});

CardSchema.pre('validate', function(next) {
	
		this.model('List').update({ _id: this.listId }, { $push: { cards: this._id } }, next)

});


module.exports = mongoose.model('Card', CardSchema)