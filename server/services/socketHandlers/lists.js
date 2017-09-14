const { List } = require('../../models/index');
const {
	INTERNAL,
	ERROR,
	SUCCESS
} = require('../../../client/src/socket/events');

module.exports = {
	_getList,
	_getLists,
	_createList,
	_deleteList
};

async function _getList(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.GET_LIST_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { id } = ctx.data;
		if (!id || !id.length) {
			return this.emit(INTERNAL.GET_LIST_FAILURE, {
				error: ERROR.LIST_NO_ID
			});
		}

		const list = await List.findOne({ id });
		if (!list) {
			return this.emit(INTERNAL.GET_LIST_FAILURE, {
				id,
				error: ERROR.LIST_NOT_EXISTS
			});
		}

		// All good.
		this.emit(INTERNAL.GET_LIST_SUCCESS, list);
	} catch (error) {
		this.emit(INTERNAL.GET_LIST_FAILURE, { error });
		console.error(error);
	}
}

async function _getLists(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.GET_LIST_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { options } = ctx.data;
		if (!options || !(typeof options === 'object')) {
			return this.emit(INTERNAL.GET_LIST_FAILURE, {
				error: ERROR.LIST_NO_OPTIONS
			});
		}

		const lists = await List.find(options);
		if (!lists || !Array.isArray(lists) || !lists.length) {
			return this.emit(INTERNAL.GET_LIST_FAILURE, {
				error: ERROR.LISTS_NOT_FOUND
			});
		}

		// All good.
		this.emit(INTERNAL.GET_LIST_SUCCESS, lists);
	} catch (error) {
		this.emit(INTERNAL.GET_LIST_FAILURE, { error });
		console.error(error);
	}
}

async function _createList(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.CREATE_LIST_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { name } = ctx.data;
		if (!name || !name.length) {
			return this.emit(INTERNAL.CREATE_LIST_FAILURE, {
				error: ERROR.LIST_NO_NAME
			});
		}

		const exists = await List.findOne({ name });
		if (exists) {
			return this.emit(INTERNAL.CREATE_LIST_FAILURE, {
				name,
				error: ERROR.LIST_EXISTS
			});
		}

		// All good.
		const list = await List.create({ name });
		this.emit(INTERNAL.CREATE_LIST_SUCCESS, {
			list,
			message: SUCCESS.CREATE_LIST
		});
	} catch (error) {
		this.emit(INTERNAL.CREATE_LIST_FAILURE, { error });
		console.error(error);
	}
}

async function _deleteList(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.DELETE_LIST_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { id } = ctx.data;
		if (!id || !id.length) {
			return this.emit(INTERNAL.DELETE_LIST_FAILURE, {
				error: ERROR.LIST_NO_ID
			});
		}

		const list = await List.find({ id });
		if (!list) {
			return this.emit(INTERNAL.DELETE_LIST_FAILURE, {
				name,
				error: ERROR.LIST_NOT_EXISTS
			});
		}

		// All good.
		await list.remove().exec();
		this.emit(INTERNAL.DELETE_LIST_SUCCESS, { message: SUCCESS.DELETE_LIST });
	} catch (error) {
		this.emit(INTERNAL.DELETE_LIST_FAILURE, { error });
		console.error(error);
	}
}
