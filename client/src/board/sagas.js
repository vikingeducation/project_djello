import { call, put, takeLatest } from 'redux-saga/effects'  
import { handleApiErrors } from '../lib/api-errors'  
import {  
  BOARD_CREATING,
  BOARD_REQUESTING,
} from './constants'

import {
	boardCreateSuccess,
	boardCreateError,
	boardRequestSuccess,
	boardRequestError,
} from './actions'

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

function boardCreateApi(client, board) {

	const { title } = board

	const url = `${baseUrl}/${client.user._id}/boards/new`;

	const options = {
		method: 'POST',
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': client.token
		},
		body: JSON.stringify({
			'title': title
		})
	};

	console.log(options);

	return fetch(url, options)
	.then(handleApiErrors)
	.then(response => response.json())
	.then(json => json)
	.catch((error) => { throw error })
}

function boardRequestApi(client, board) {

	const url = `${baseUrl}/${client.user._id}/boards/`

	const options = {
		method: 'GET',
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': client.token
		}
	}

	return fetch(url, options)
		.then(handleApiErrors)
		.then(response => response.json())
		.then(json => json)
		.catch(error => { throw error })
}

function* boardRequestFlow(action) {
	try {
		const { client, board } = action
		const requestedBoard = yield call(boardRequestApi, client, board)
		yield put(boardRequestSuccess(requestedBoard))
	} catch(error) {
		yield put(boardRequestError(error))
	}
}

function* boardCreateFlow(action) {
	try {
		const { client, board } = action
		const createdBoard = yield call(boardCreateApi, client, board)
		yield put(boardCreateSuccess(createdBoard))
	} catch(error) {
		yield put(boardCreateError(error))
	}
}


function* boardWatcher() {
	yield [
		takeLatest(BOARD_CREATING, boardCreateFlow),
		takeLatest(BOARD_REQUESTING, boardRequestFlow),
	]
}

export default boardWatcher