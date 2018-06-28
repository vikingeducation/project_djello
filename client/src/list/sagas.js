import { call, put, takeLatest } from 'redux-saga/effects'  
import { handleApiErrors } from '../lib/api-errors'  
import {  
	LIST_CREATING,
	LIST_UPDATING,
	LIST_DELETING,
} from './constants'

import { 
	listBoardCreateSuccess, 
	listBoardDeleteSuccess 
} from '../board/actions'

import {
	listCreateSuccess,
	listCreateError,
	listUpdateSuccess,
	listUpdateError,
	listDeleteSuccess,
	listDeleteError,
} from './actions'

import {
	listCardDeleteSuccess
} from '../card/actions'

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

function listApi(client, list, path) {

	const url = `${baseUrl}/${client.user._id}/boards/${list.boardId}/lists/${path}`;

	const options = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': client.token
		},
		body: JSON.stringify({
			list,
		})
	};

	return fetch(url, options)
	.then(handleApiErrors)
	.then(response => response.json())
	.then(json => json)
	.catch((error) => { throw error })
}

function* listCreateFlow(action) {
	try {
		const { client, list } = action
		const createdList = yield call(listApi, client, list, 'new')
		yield put(listCreateSuccess(createdList))
		yield put(listBoardCreateSuccess(createdList))
	} catch(error) {
		yield put(listCreateError(error))
	}
}

function* listUpdateFlow(action) {
	try {
		const { client, list } = action
		const updatedList = yield call(listApi, client, list, `${list._id}/update`)
		yield put(listUpdateSuccess(updatedList))
	} catch(error) {
		yield put(listUpdateError(error))
	}
}

function* listDeleteFlow(action) {
	try {
		const { client, list } = action
		const deletedList = yield call(listApi, client, list, `${list._id}/delete`)
		yield put(listDeleteSuccess(deletedList))
		yield put(listBoardDeleteSuccess(deletedList))
		yield put(listCardDeleteSuccess(deletedList))
	} catch(error) {
		yield put(listDeleteError(error))
	}
}

function* listWatcher() {
	yield [
	takeLatest(LIST_CREATING, listCreateFlow),
	takeLatest(LIST_UPDATING, listUpdateFlow),
	takeLatest(LIST_DELETING, listDeleteFlow)
	]
}

export default listWatcher