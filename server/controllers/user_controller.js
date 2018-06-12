const User = require('../models/user');
const authController = require('../controllers/authentication');
const { readListsByUserId } = require('../lib/list_query');
const { readDataByUserId } = require('../lib/card_query');

function formatUsers(users) {
	return users.map(user => {
		return formatUser(user);
	});
};

function formatUser(user) {

	if(user)
		return {
			id: user.id,
			email: user.email,
			profile: user.profile,			
			role: user.role
		};
	else
		return {};
};

function updateUser(email, password, firstName, lastName) {

	const obj = {}

	if(email) obj.email = email;
	if(password) obj.password = password;

	if(firstName || lastName) {
		obj.profile = {}

		if(firstName) obj.profile.firstName = firstName;
		if(lastName) obj.profile.lastName = lastName;
	}

	return obj;
}

exports.readData = (req, res) => {

	readDataByUserId(req.params.userId)
		.then(all => {
			res.status(200).json(all)
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}


exports.readAll = (req, res) => {

	User.find({})
		.then(users => {
			res.status(200).json(formatUsers(users));
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
};

exports.read = (req, res) => {

	const userId = req.params.userId;

	User.findOne({ _id: userId })
		.then(user => {
			res.status(200).json(formatUser(user));
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
};

exports.verifyUser = (req, res, next) => {

	const paramId = req.params.userId;
	const reqId = req.user._id;

	if(paramId === reqId)
		next();
	else
		res.status(500).send('Unauthorized');
}

exports.updateUser = (req, res) => {

	const userId = req.params.userId;

	const userObj = updateUser(req.body.email, req.body.password, req.body.firstName, req.body.lastName);

	User.findById({ _id: userId })
		.then(user => {
			user.set(userObj);
			user.save(function(err, updatedUser) {
				if(err) return res.status(500).json({ error: e.stack });
				res.status(200).json(updatedUser);
			})
		})
		.catch(e => {
			res.status(500).json({ error: e.stack })
		});
};

exports.deleteUser = (req, res) => {

	const userId = req.params.userId;

	User.deleteOne({ _id: userId })
		.then(() => {
			res.status(200).json({ success: `USER ${ userId } DELETED`});
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
};