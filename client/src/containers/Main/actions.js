import Events from '../../socket/events';
const { REDUCERS, CLIENT, INTERNAL } = Events;

/* BOARD SELECTION ACTIONS */
const attemptGetBoard = () => ({ type: INTERNAL.GET_BOARD });
const attemptGetBoards = () => ({ type: INTERNAL.GET_BOARDS });
export const successGetBoard = data => ({
	type: INTERNAL.GET_BOARD_SUCCESS,
	data
});
export const failureGetBoard = err => ({
	type: INTERNAL.GET_BOARD_FAILURE,
	err
});

export const getBoards = options => async dispatch => {
	dispatch(attemptGetBoards());

	if (!options.socket) {
		dispatch(failureGetBoard({ error: 'No socket to utilize' }));
	}

	const socket = options.socket;
	delete options.socket;

	try {
		// Emit the get boards event.
		socket.emit(INTERNAL.GET_BOARDS, options);
	} catch (err) {
		dispatch(failureGetBoard(err));
	}
};

export const changeSelectedBoard = board => ({
	type: CLIENT.CHANGE_SELECTED_BOARD,
	board
});
