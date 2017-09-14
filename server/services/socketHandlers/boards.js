const { Board } = require('../../models/index');
const {
	INTERNAL,
	ERROR,
	SUCCESS
} = require('../../../client/src/socket/events');

module.exports = {
	_getBoard,
	_getBoards,
	_createBoard,
	_deleteBoard
};

async function _getBoard(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.GET_BOARD_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { id } = ctx.data;
		if (!id || !id.length) {
			return this.emit(INTERNAL.GET_BOARD_FAILURE, {
				error: ERROR.BOARD_NO_ID
			});
		}

		const board = await Board.findOne({ id });
		if (!board) {
			return this.emit(INTERNAL.GET_BOARD_FAILURE, {
				id,
				error: ERROR.BOARD_NOT_EXISTS
			});
		}

		// All good.
		this.emit(INTERNAL.GET_BOARD_SUCCESS, board);
	} catch (error) {
		this.emit(INTERNAL.GET_BOARD_FAILURE, { error });
		console.error(error);
	}
}

async function _getBoards(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.GET_BOARD_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { options } = ctx.data;
		if (!options || !(typeof options === 'object')) {
			return this.emit(INTERNAL.GET_BOARD_FAILURE, {
				error: ERROR.BOARD_NO_OPTIONS
			});
		}

		const boards = await Board.find(options);
		if (!boards || !Array.isArray(boards) || !boards.length) {
			return this.emit(INTERNAL.GET_BOARD_FAILURE, {
				error: ERROR.BOARDS_NOT_FOUND
			});
		}

		// All good.
		this.emit(INTERNAL.GET_BOARD_SUCCESS, boards);
	} catch (error) {
		this.emit(INTERNAL.GET_BOARD_FAILURE, { error });
		console.error(error);
	}
}

async function _createBoard(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.CREATE_BOARD_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { name } = ctx.data;
		if (!name || !name.length) {
			return this.emit(INTERNAL.CREATE_BOARD_FAILURE, {
				error: ERROR.BOARD_NO_NAME
			});
		}

		const exists = await Board.findOne({ name });
		if (exists) {
			return this.emit(INTERNAL.CREATE_BOARD_FAILURE, {
				name,
				error: ERROR.BOARD_EXISTS
			});
		}

		// All good.
		const board = await Board.create({ name });
		this.emit(INTERNAL.CREATE_BOARD_SUCCESS, {
			board,
			message: SUCCESS.CREATE_BOARD
		});
	} catch (error) {
		this.emit(INTERNAL.CREATE_BOARD_FAILURE, { error });
		console.error(error);
	}
}

async function _deleteBoard(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.DELETE_BOARD_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { id } = ctx.data;
		if (!id || !id.length) {
			return this.emit(INTERNAL.DELETE_BOARD_FAILURE, {
				error: ERROR.BOARD_NO_ID
			});
		}

		const board = await Board.find({ id });
		if (!board) {
			return this.emit(INTERNAL.DELETE_BOARD_FAILURE, {
				name,
				error: ERROR.BOARD_NOT_EXISTS
			});
		}

		// All good.
		await board.remove().exec();
		this.emit(INTERNAL.DELETE_BOARD_SUCCESS, { message: SUCCESS.DELETE_BOARD });
	} catch (error) {
		this.emit(INTERNAL.DELETE_BOARD_FAILURE, { error });
		console.error(error);
	}
}
