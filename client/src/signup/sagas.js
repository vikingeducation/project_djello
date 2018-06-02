import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from './constants';
import { handleApiErrors } from '../lib/api-errors';


const signupUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;

function signupApi(email, password, firstName, lastName){

	return fetch(signupUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, firstName, lastName }),
	})
		.then(handleApiErrors)
		.then(response => response.json())
		.then(json => json)
		.catch((error) => { throw error })


}

function* signupFlow (action) {
	try {
		const { email, password, firstName, lastName } = action;
		const response = yield call(signupApi, email, password, firstName, lastName);
		yield put({ type: SIGNUP_SUCCESS, response });
	} catch(error) {
		yield put({ type: SIGNUP_ERROR, error })
	}
}

function* signupWatcher(){

	yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher