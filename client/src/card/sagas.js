import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'  
import { handleApiErrors } from '../lib/api-errors'  
import {  
  CARD_CREATING,
  CARD_UPDATING,
  CARD_DELETING,
} from './constants'

import { cardListCreateSuccess, cardListDeleteSuccess } from '../list/actions'

import {
	cardCreateSuccess,
	cardCreateError,
	cardUpdateSuccess,
	cardUpdateError,
	cardDeleteSuccess,
	cardDeleteError,
	cardSet,
} from './actions'

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

function cardCreateApi(client, list, card) {

	console.log(list);

	const url = `${baseUrl}/${client.user._id}/boards/${list.boardId}/lists/${list._id}/cards/new`;

	const options = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': client.token
		},
		body: JSON.stringify({
			card,
		})
	};

	return fetch(url, options)
	.then(handleApiErrors)
	.then(response => response.json())
	.then(json => json)
	.catch((error) => { throw error })
}


function* cardCreateFlow(action) {
	try {
		const { client, list, card } = action
		const createdCard = yield call(cardCreateApi, client, list, card)
		yield put(cardCreateSuccess(createdCard))
		yield put(cardListCreateSuccess(createdCard))
	} catch(error) {
		yield put(cardCreateError(error))
	}
}

function cardDeleteApi(client, list, card) {

	const url = `${baseUrl}/${client.user._id}/boards/${list.boardId}/lists/${list._id}/cards/${card._id}/delete`;

	const options = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': client.token
		},
		body: JSON.stringify({
			card,
		})
	};

	return fetch(url, options)
	.then(handleApiErrors)
	.then(response => response.json())
	.then(json => json)
	.catch((error) => { throw error })

}

function* cardDeleteFlow(action) {
	try {
		const { client, list, card } = action
		const deletedCard = yield call(cardDeleteApi, client, list, card)
		yield put(cardDeleteSuccess(deletedCard))
		yield put(cardListDeleteSuccess(deletedCard))
	} catch(error) {
		yield put(cardDeleteError(error))
	}
}

function cardUpdateApi(client, list, card) {

	const url = `${baseUrl}/${client.user._id}/boards/${list.boardId}/lists/${list._id}/cards/${card._id}/update`;

	const options = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': client.token
		},
		body: JSON.stringify({
			card,
		})
	};

	return fetch(url, options)
	.then(handleApiErrors)
	.then(response => response.json())
	.then(json => json)
	.catch((error) => { throw error })
}

function* cardUpdateFlow(action) {
	try {
		const { client, list, card } = action
		const updatedCard = yield call(cardUpdateApi, client, list, card)
		yield put(cardUpdateSuccess(updatedCard))
	} catch(error) {
		yield put(cardUpdateError(error))
	}
}

function* cardWatcher() {
	yield [
		takeLatest(CARD_CREATING, cardCreateFlow),
		takeLatest(CARD_UPDATING, cardUpdateFlow),
		takeLatest(CARD_DELETING, cardDeleteFlow)
	]
}

export default cardWatcher