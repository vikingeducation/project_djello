import { call, put, takeLatest } from 'redux-saga/effects'  
import { handleApiErrors } from '../lib/api-errors'  
import {  
	BOARD_CREATING,
	BOARD_UPDATING,
	BOARD_DELETING,
} from './constants'

import {
	boardCreateSuccess,
	boardCreateError,
	boardUpdateSuccess,
	boardUpdateError,
	boardDeleteSuccess,
	boardDeleteError,
} from './actions'

import {
	boardListDeleteSuccess
} from '../list/actions'

import {
	boardListCardDeleteSuccess
} from '../card/actions'

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

function boardApi(client, board, path) {

	const url = `${baseUrl}/${client.user._id}/boards/${path}`;

	const options = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': client.token
		},
		body: JSON.stringify({
			board,
		})
	};

	return fetch(url, options)
	.then(handleApiErrors)
	.then(response => response.json())
	.then(json => json)
	.catch((error) => { throw error })
}

function* boardCreateFlow(action) {
	try {
		const { client, board } = action
		const createdBoard = yield call(boardApi, client, board, 'new')
		yield put(boardCreateSuccess(createdBoard))
	} catch(error) {
		yield put(boardCreateError(error))
	}
}

function* boardUpdateFlow(action) {
	try {
		const { client, board } = action
		const updatedBoard = yield call(boardApi, client, board, `${board._id}/update`)
		yield put(boardUpdateSuccess(updatedBoard))
	} catch(error) {
		yield put(boardUpdateError(error))
	}
}

function* boardDeleteFlow(action) {
	try {
		const { client, board } = action
		const deletedBoard = yield call(boardApi, client, board, `${board._id}/delete`)
		yield put(boardDeleteSuccess(deletedBoard))
		yield put(boardListDeleteSuccess(deletedBoard))
		yield put(boardListCardDeleteSuccess(deletedBoard))
	} catch(error) {
		yield put(boardDeleteError(error))
	}
}

function* boardWatcher() {
	yield [
	takeLatest(BOARD_CREATING, boardCreateFlow),
	takeLatest(BOARD_UPDATING, boardUpdateFlow),
	takeLatest(BOARD_DELETING, boardDeleteFlow)
	]
}

export default boardWatcher