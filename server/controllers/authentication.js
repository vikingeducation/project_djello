const jwt = require('jsonwebtoken'),  
      crypto = require('crypto'),
      User = require('../models/user'),
      config = require('../config/main'),
      shortid = require('shortid'),
      ExtractJwt = require('passport-jwt').ExtractJwt;

function generateToken(user) {
	return jwt.sign(user, config.secret, {
		expiresIn: 10080
	})
};


function setUserInfo(request) {
	return {
		_id: request._id,
		firstName: request.profile.firstName,
		lastName: request.profile.lastName,
		email: request.email,
		role: request.role
	}
}

exports.login = function(req, res, next) {
	let userInfo = setUserInfo(req.user);

	res.status(200).json({
		id: 'JWT ' + generateToken(userInfo),
		user: userInfo
	})
}

exports.register = function(req, res, next) {
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const password = req.body.password;

	// return error if no email provided
	if(!email) {
		return res.status(422).send({ error: 'You must enter an email address.'});
	}

	// return error if no full name provided
	if(!firstName || !lastName) {
		return res.status(422).send({ error: 'You must enter your full name.'});
	}

	if(!password) {
		return res.status(422).send({ error: 'You must enter a password.'});
	}

	User.findOne({ email: email }, function(err, exisitingUser) {
		if(err) { return next(err); }

		if(exisitingUser) {
			return res.status(422).send({ error: 'That email address is already taken.'})
		}

		let user = new User({
			_id: shortid.generate(),
			email: email,
			password: password,
			profile: { firstName: firstName, lastName: lastName }
		})

		user.save(function(err, user) {
			if(err) { return next(err); }

			let userInfo = setUserInfo(user);

			res.status(201).json({
				id: 'JWT ' + generateToken(userInfo),
				user: userInfo
			})
		})
	})
}

exports.roleAuthorization = function(role) {
	return function(req, res, next) {
		const user = req.user;

		User.findById(user._id, function(err, foundUser) {
			if(err) {
				res.status(422).json({ error: 'No user was found' });
				return next(err)
			}

			if(foundUser.role == role) {
				return next();
			}

			res.status(401).json({ error: 'You are not authorizaed to view this content.' });
			return next('Unauthorized');
		})
	}
};

