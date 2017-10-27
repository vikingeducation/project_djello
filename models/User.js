const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		passwordHash: String,
		avatar: String,
		fname: String,
		lname: String,
		about: String,
		boards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Board'
			}
		]
	},
	{
		timestamps: true
	}
);

UserSchema.plugin(uniqueValidator);

UserSchema.virtual('password').set(function(val) {
	this.passwordHash = bcrypt.hashSync(val, 10);
});

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.passwordHash);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
