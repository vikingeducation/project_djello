const connect = require('../mongo');
const Handlers = require('./socketHandlers');

const { SYSTEM, CLIENT, INTERNAL } = require('../../client/src/socket/events');

module.exports = async (ctx, next) => {
	try {
		// Connect to the database.
		await connect();
		console.log('Socket connection initiated!');

		const client = ctx.socket;

		// // TEMP
		// Handlers._createUser.call(client, {
		// 	user: { test: 'test' },
		// 	data: {
		// 		username: 'foo',
		// 		password: 'bar'
		// 	}
		// });

		// REGISTER EVENTS
		client.on(SYSTEM.ATTEMPT_REGISTER, Handlers._attemptRegister.bind(client));

		// LOGIN EVENTS
		client.on(CLIENT.ATTEMPT_LOGIN, Handlers._attemptLogin.bind(client));
	} catch (error) {
		console.error(error);
	}
};
