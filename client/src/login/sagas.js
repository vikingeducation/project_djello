import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import { setClient, unsetClient } from '../client/actions';
import { CLIENT_UNSET } from '../client/constants';
import history from '../lib/history';


const loginUrl = `${process.env.REACT_APP_API_URL}/login`;

function loginApi(email, password) {

	return fetch(loginUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})
		.then(handleApiErrors)
		.then(response => response.json())
		.then(json => json)
		.catch((error) => { throw error })
}


function* logout() {

	yield put(unsetClient())
	localStorage.removeItem('token')
	history.push('/login');
}

function* loginFlow(email, password){
	let response
	try {
		response = yield call(loginApi, email, password)
		yield put(setClient(response))
		yield put({ type: LOGIN_SUCCESS })
		localStorage.setItem('token', response.token)
		history.push('/dashboard')
	} catch (error) {
		yield put({ type: LOGIN_ERROR, error })
	} finally {
		if (yield cancelled()) {
			history.push('/login');
		}
	}
}

function* loginWatcher(){

	while(true) {
		const { email, password } = yield take(LOGIN_REQUESTING);
		const task = yield fork(loginFlow, email, password);
		const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
		if(action.type === CLIENT_UNSET) yield cancel(task)
		yield call(logout)

	}
}

export default loginWatcher
