const connect = require('../mongo');

const { User, Board, List, Card } = require('../models/index');
const { SYSTEM, CLIENT } = require('../../client/src/socket/events');

module.exports = async (ctx, next) => {
	try {
		// Connect to the database.
		await connect();
		console.log('Socket connection initiated!');
		const client = ctx.socket;
		// REGISTER EVENTS
		client.on(SYSTEM.ATTEMPT_REGISTER, _attemptRegister.bind(client));

		// LOGIN EVENTS
		client.on(CLIENT.ATTEMPT_LOGIN, _attemptLogin.bind(client));
	} catch (error) {
		console.error(error);
	}
};

async function _attemptRegister(ctx) {
	try {
		// const user = await User.findOne({ username: username });
		// if (user && user.validatePassword(password)) {
		// 	// Success, save user to socket session.
		// 	ctx.user = user;
		// 	return this.emit(SYSTEM.SUCCESS_REGISTER, user);
		// } else {
		// 	// Failure
		// 	return this.emit(SYSTEM.FAILURE_REGISTER, ctx.data);
		// }
	} catch (error) {
		console.error(error);
	}
}

async function _attemptLogin(ctx) {
	try {
		const { username, password } = ctx.data;
		if (!username || !password) {
			// Failure
			return this.emit(CLIENT.FAILURE_LOGIN, ctx.data);
		}

		console.log('Login attempt from: ', ctx.data.username);

		const user = await User.findOne({ username: username });
		if (user && user.validatePassword(password)) {
			// Success, save user to socket session.
			ctx.user = user;
			return this.emit(CLIENT.SUCCESS_LOGIN, user);
		} else {
			// Failure
			return this.emit(CLIENT.FAILURE_LOGIN, ctx.data);
		}
	} catch (error) {
		console.error(error);
	}
}
