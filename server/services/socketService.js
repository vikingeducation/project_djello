const connect = require('../mongo');
const Handlers = require('./socketHandlers');

const { SYSTEM, CLIENT, INTERNAL } = require('../../client/src/socket/events');

module.exports = async (ctx, next) => {
	try {
		// Connect to the database.
		await connect();
		console.log('Socket connection initiated!');

		const client = ctx.socket;

		// REGISTER EVENTS
		client.on(SYSTEM.ATTEMPT_REGISTER, Handlers._attemptRegister.bind(client));

		// LOGIN EVENTS
		client.on(CLIENT.ATTEMPT_LOGIN, Handlers._attemptLogin.bind(client));

		// USER EVENTS
		client.on(INTERNAL.GET_USER, Handlers._getUser.bind(client));
		client.on(INTERNAL.GET_USERS, Handlers._getUsers.bind(client));
		client.on(INTERNAL.CREATE_USER, Handlers._createUser.bind(client));
		client.on(INTERNAL.DELETE_USER, Handlers._deleteUser.bind(client));

		// BOARD EVENTS
		client.on(INTERNAL.GET_BOARD, Handlers._getBoard.bind(client));
		client.on(INTERNAL.GET_BOARDS, Handlers._getBoards.bind(client));
		client.on(INTERNAL.CREATE_BOARD, Handlers._createBoard.bind(client));
		client.on(INTERNAL.DELETE_BOARD, Handlers._deleteBoard.bind(client));

		// LIST EVENTS
		client.on(INTERNAL.GET_LIST, Handlers._getList.bind(client));
		client.on(INTERNAL.GET_LISTS, Handlers._getLists.bind(client));
		client.on(INTERNAL.CREATE_LIST, Handlers._createList.bind(client));
		client.on(INTERNAL.MODIFY_LIST, Handlers._modifyList.bind(client));
		client.on(INTERNAL.DELETE_LIST, Handlers._deleteList.bind(client));

		// CARD EVENTS
		client.on(INTERNAL.GET_CARD, Handlers._getCard.bind(client));
		client.on(INTERNAL.GET_CARDS, Handlers._getCards.bind(client));
		client.on(INTERNAL.CREATE_CARD, Handlers._createCard.bind(client));
		client.on(INTERNAL.MODIFY_CARD, Handlers._modifyCard.bind(client));
		//client.on(INTERNAL.COMPLETE_CARD, Handlers._completeCard.bind(client));
		client.on(INTERNAL.DELETE_CARD, Handlers._deleteCard.bind(client));
	} catch (error) {
		console.error(error);
	}
};
