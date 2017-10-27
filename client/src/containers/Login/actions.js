import Events from '../../socket/events';
const { REDUCERS, CLIENT, INTERNAL } = Events;

/* CLIENT ACTIONS */
const attemptLogin = () => ({ type: CLIENT.ATTEMPT_LOGIN });
const attemptLogout = () => ({ type: CLIENT.ATTEMPT_LOGOUT });
export const successLogout = () => ({ type: CLIENT.SUCCESS_LOGOUT });
export const failureLogout = err => ({ type: CLIENT.FAILURE_LOGOUT });
export const successLogin = data => ({ type: CLIENT.SUCCESS_LOGIN, data });
export const failureLogin = err => ({ type: CLIENT.FAILURE_LOGIN, err });

export const defaultLogin = options => async dispatch => {
	// Check local storage first.
	const sessionId = localStorage.getItem('sessionId');
	if (sessionId && sessionId.length > 0) {
		dispatch(attemptLogin());

		if (!options.socket) {
			dispatch(failureLogin({ error: 'No socket to utilize' }));
		}

		const socket = options.socket;
		delete options.socket;

		try {
			const _onGetUser = user => {
				// Emit the default login if we found a token in local storage.
				socket.emit(CLIENT.ATTEMPT_LOGIN, Object.assign({}, user, options));
				socket.off(INTERNAL.GET_USER_SUCCESS, _onGetUser);
			};

			socket.on(INTERNAL.GET_USER_SUCCESS, _onGetUser);

			// Emit get user event to find current user by session id.
			socket.emit(INTERNAL.GET_USER, { sessionToken: sessionId });
		} catch (err) {
			dispatch(failureLogin(err));
		}
	}
};

export const login = options => async dispatch => {
	dispatch(attemptLogin());

	if (!options.socket) {
		dispatch(failureLogin({ error: 'No socket to utilize' }));
	}

	const socket = options.socket;
	delete options.socket;

	try {
		// Emit the register event and pass the data.
		socket.emit(CLIENT.ATTEMPT_LOGIN, options);
	} catch (err) {
		dispatch(failureLogin(err));
	}
};

export const clearLoginError = () => {
	return {
		type: INTERNAL.CLEAR_ERROR,
		reducer: REDUCERS.LOGIN
	};
};

export const logout = options => async dispatch => {
	options = options || {};
	dispatch(attemptLogout());

	localStorage.removeItem('sessionId');

	if (!options.socket) {
		dispatch(successLogout());
	} else {
		const socket = options.socket;
		delete options.socket;

		try {
			// Emit logout event to socket.
			socket.emit(CLIENT.ATTEMPT_LOGOUT);
		} catch (err) {
			console.log(err);
			dispatch(failureLogout(err));
		}
	}
};
