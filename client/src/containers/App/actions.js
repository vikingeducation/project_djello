import Events from '../../socket/events';
import * as LoginActions from '../Login/actions';
import * as MainActions from '../Main/actions';

const { REDUCERS, SYSTEM, CLIENT, INTERNAL } = Events;

/* SYSTEM ACTIONS */
const attemptRegister = () => ({ type: SYSTEM.ATTEMPT_REGISTER });
const successRegister = data => ({
	type: SYSTEM.SUCCESS_REGISTER,
	data
});
const failureRegister = err => ({ type: SYSTEM.FAILURE_REGISTER, err });

const register = options => async dispatch => {
	dispatch(attemptRegister());

	if (!options.socket) {
		dispatch(failureRegister({ error: 'No socket to utilize' }));
	}

	const socket = options.socket;
	delete options.socket;

	try {
		// Emit the register event and pass the data.
		socket.emit(SYSTEM.ATTEMPT_REGISTER, options);
	} catch (err) {
		dispatch(failureRegister(err));
	}
};

export default {
	...Events,
	...LoginActions,
	...MainActions,
	register
};
