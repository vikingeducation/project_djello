const User = require('../models/user')

 exports.getId = function(req, res, next) {

	const email = req.body.email;

	User.findOne({ email: email, }, function(err, user) {
		if(err) { return err }
		req.body.validId = user._id;
		next();
	})
}