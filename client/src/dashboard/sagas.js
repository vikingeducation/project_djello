import { call, put, takeLatest } from 'redux-saga/effects'  
import { handleApiErrors } from '../lib/api-errors' 

import { boardSet } from '../board/actions'
import { listSet } from '../list/actions'
import { cardSet } from '../card/actions'
import { DATA_REQUESTING } from './constants';

import {
	dataRequestSuccess,
	dataRequestError
} from './actions';

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;


function dataRequestApi(client) {

	const url = `${baseUrl}/${client.user._id}/boards/`;

	const options = {
		method: 'GET',
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json'
		}
	};

	return fetch(url, options)
		.then(handleApiErrors)
		.then(response => response.json())
		.then(json => json)
		.catch(error => {throw error});
}

function* dataRequestFlow(action) {
	try {
		const { client } = action
		const requestedData = yield call(dataRequestApi, client)
		yield put(dataRequestSuccess());
		yield put(boardSet(requestedData.boards))
		yield put(listSet(requestedData.lists))
		yield put(cardSet(requestedData.cards))
	} catch(error) {
		yield put(dataRequestError(error))
	}
}

function* dataWatcher() {
	yield takeLatest(DATA_REQUESTING, dataRequestFlow)
}

export default dataWatcher