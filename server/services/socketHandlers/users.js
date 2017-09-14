const { User } = require('../../models/index');
const {
	INTERNAL,
	ERROR,
	SUCCESS
} = require('../../../client/src/socket/events');

module.exports = {
	_getUser,
	_getUsers,
	_createUser,
	_deleteUser
};

async function _getUser(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.GET_USER_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { id } = ctx.data;
		if (!id || !id.length) {
			return this.emit(INTERNAL.GET_USER_FAILURE, {
				error: ERROR.USER_NO_ID
			});
		}

		const user = await User.findOne({ id });
		if (!user) {
			return this.emit(INTERNAL.GET_USER_FAILURE, {
				id,
				error: ERROR.USER_NOT_EXISTS
			});
		}

		// All good.
		this.emit(INTERNAL.GET_USER_SUCCECSS, user);
	} catch (error) {
		this.emit(INTERNAL.GET_USER_FAILURE, { error });
		console.error(error);
	}
}

async function _getUsers(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.GET_USER_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { options } = ctx.data;
		if (!options || !(typeof options === 'object')) {
			return this.emit(INTERNAL.GET_USER_FAILURE, {
				error: ERROR.USER_NO_OPTIONS
			});
		}

		const users = await User.find(options);
		if (!users || !Array.isArray(users) || !users.length) {
			return this.emit(INTERNAL.GET_USER_FAILURE, {
				error: ERROR.USERS_NOT_EXISTS
			});
		}

		// All good.
		this.emit(INTERNAL.GET_USER_SUCCECSS, users);
	} catch (error) {
		this.emit(INTERNAL.GET_USER_FAILURE, { error });
		console.error(error);
	}
}

async function _createUser(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.CREATE_USER_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { username, password } = ctx.data;
		if (!username || !username.length) {
			return this.emit(INTERNAL.CREATE_USER_FAILURE, {
				error: ERROR.USER_NO_NAME
			});
		}

		if (!password || !password.length) {
			return this.emit(INTERNAL.CREATE_USER_FAILURE, {
				error: ERROR.USER_NO_PASS
			});
		}

		const exists = await User.findOne({ username });
		if (exists) {
			return this.emit(INTERNAL.CREATE_USER_FAILURE, {
				username,
				error: ERROR.USER_EXISTS
			});
		}

		// All good.
		const user = await User.create({ username, password });
		this.emit(INTERNAL.GET_USER_SUCCECSS, {
			user,
			message: SUCCESS.CREATE_USER
		});
	} catch (error) {
		this.emit(INTERNAL.CREATE_USER_FAILURE, { error });
		console.error(error);
	}
}

async function _deleteUser(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.DELETE_USER_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { id } = ctx.data;
		if (!id || !id.length) {
			return this.emit(INTERNAL.DELETE_USER_FAILURE, {
				error: ERROR.USER_NO_ID
			});
		}

		await User.findByIdAndRemove({ id });
		this.emit(INTERNAL.DELETE_USER_SUCCESS, { message: SUCCESS.DELETE_USER });
	} catch (error) {
		this.emit(INTERNAL.DELETE_USER_FAILURE, { error });
		console.error(error);
	}
}
