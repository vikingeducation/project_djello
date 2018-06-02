module.exports = function(requireLogin) {

	const router = require('express').Router();
	const authController = require('../controllers/authentication');

	router.post('/register', authController.register);
	router.post('/login', requireLogin, authController.login);

	return router;
};

