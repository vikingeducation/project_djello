import { call, put, takeLatest, select } from 'redux-saga/effects'  
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
	boardSet,
} from './actions'

import {
	boardListDeleteSuccess
} from '../list/actions'

import {
	boardListCardDeleteSuccess
} from '../card/actions'

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

function boardCreateApi(client, board) {

	const url = `${baseUrl}/${client.user._id}/boards/new`;

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
		const createdBoard = yield call(boardCreateApi, client, board)
		yield put(boardCreateSuccess(createdBoard))
	} catch(error) {
		yield put(boardCreateError(error))
	}
}

function boardDeleteApi(client, board) {

	const url = `${baseUrl}/${client.user._id}/boards/${board._id}/delete`;

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

function* boardDeleteFlow(action) {
	try {
		const { client, board } = action
		const deletedBoard = yield call(boardDeleteApi, client, board)
		yield put(boardDeleteSuccess(deletedBoard))
		yield put(boardListDeleteSuccess(deletedBoard))
		yield put(boardListCardDeleteSuccess(deletedBoard))
	} catch(error) {
		yield put(boardDeleteError(error))
	}
}


function boardUpdateApi(client, board) {

	console.log(client, board);

	const url = `${baseUrl}/${client.user._id}/boards/${board._id}/update`;

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

function* boardUpdateFlow(action) {
	try {
		const { client, board } = action
		const updatedBoard = yield call(boardUpdateApi, client, board)
		yield put(boardUpdateSuccess(updatedBoard))
	} catch(error) {
		yield put(boardUpdateError(error))
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