const { User } = require('../../models/index');
const {
	SYSTEM,
	CLIENT,
	INTERNAL
} = require('../../../client/src/socket/events');

const { _getUser, _getUsers, _createUser, _deleteUser } = require('./users');
const {
	_getBoard,
	_getBoards,
	_createBoard,
	_deleteBoard
} = require('./boards');
const {
	_getList,
	_getLists,
	_createList,
	_modifyList,
	_deleteList
} = require('./lists');
const {
	_getCard,
	_getCards,
	_createCard,
	_modifyCard,
	_deleteCard
} = require('./cards');

module.exports = {
	_attemptRegister,
	_attemptLogin,
	_getUser,
	_getUsers,
	_createUser,
	_deleteUser,
	_getBoard,
	_getBoards,
	_createBoard,
	_deleteBoard,
	_getList,
	_getLists,
	_createList,
	_modifyList,
	_deleteList,
	_getCard,
	_getCards,
	_createCard,
	_modifyCard,
	_deleteCard
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
		this.emit(SYSTEM.FAILURE_REGISTER, error);
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
		this.emit(CLIENT.FAILURE_LOGIN, error);
		console.error(error);
	}
}
