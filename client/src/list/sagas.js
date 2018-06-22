import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'  
import { handleApiErrors } from '../lib/api-errors'  
import {  
  LIST_CREATING,
  LIST_UPDATING,
  LIST_DELETING,
} from './constants'

import { listBoardCreateSuccess, listBoardDeleteSuccess } from '../board/actions'

import {
	listCreateSuccess,
	listCreateError,
	listUpdateSuccess,
	listUpdateError,
	listDeleteSuccess,
	listDeleteError,
	listSet,
} from './actions'

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

function listCreateApi(client, list) {

	const url = `${baseUrl}/${client.user._id}/boards/${list.boardId}/lists/new`;

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
		const createdList = yield call(listCreateApi, client, list)
		yield put(listCreateSuccess(createdList))
		yield put(listBoardCreateSuccess(createdList))
	} catch(error) {
		yield put(listCreateError(error))
	}
}

function listDeleteApi(client, list) {

	const url = `${baseUrl}/${client.user._id}/boards/${list.boardId}/lists/${list._id}/delete`;

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

function* listDeleteFlow(action) {
	try {
		const { client, list } = action
		const deletedList = yield call(listDeleteApi, client, list)
		yield put(listDeleteSuccess(deletedList))
		yield put(listBoardDeleteSuccess(deletedList))
	} catch(error) {
		yield put(listDeleteError(error))
	}
}

function listUpdateApi(client, list) {

	const url = `${baseUrl}/${client.user._id}/boards/${list.boardId}/lists/${list._id}/update`;

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

function* listUpdateFlow(action) {
	try {
		const { client, list } = action
		const updatedList = yield call(listUpdateApi, client, list)
		yield put(listUpdateSuccess(updatedList))
	} catch(error) {
		yield put(listUpdateError(error))
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