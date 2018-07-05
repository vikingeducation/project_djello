import { call, put, takeLatest } from 'redux-saga/effects'  
import { handleApiErrors } from '../lib/api-errors'  
import {  
	DATA_REQUESTING
} from '../dashboard/constants'

import {
	userSet
} from './actions'

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

function userApi(client) {

	const url = `${baseUrl}/${client.user._id}`;

	const options = {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': client.token
		}
	};

	return fetch(url, options)
	.then(handleApiErrors)
	.then(response => response.json())
	.then(json => json)
	.catch((error) => { throw error })
}

function* userFlow(action) {
	try {
		const { client } = action
		const user = yield call(userApi, client)
		yield put(userSet(user))
	} catch(error) {
		console.log(error);
	}
}

function* userWatcher() {
	yield takeLatest(DATA_REQUESTING, userFlow)
}

export default userWatcher