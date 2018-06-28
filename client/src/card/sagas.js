import { call, put, takeLatest } from 'redux-saga/effects'  
import { handleApiErrors } from '../lib/api-errors'  
import {  
	CARD_CREATING,
	CARD_UPDATING,
	CARD_DELETING,
} from './constants'

import { 
	cardListCreateSuccess, 
	cardListDeleteSuccess 
} from '../list/actions'

import {
	cardCreateSuccess,
	cardCreateError,
	cardUpdateSuccess,
	cardUpdateError,
	cardDeleteSuccess,
	cardDeleteError,
} from './actions'

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

function cardApi(client, list, card, path) {

	console.log(card);

	const url = `${baseUrl}/${client.user._id}/boards/${list.boardId}/lists/${list._id}/cards/${path}`;

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
		const createdCard = yield call(cardApi, client, list, card, 'new')
		yield put(cardCreateSuccess(createdCard))
		yield put(cardListCreateSuccess(createdCard))
	} catch(error) {
		yield put(cardCreateError(error))
	}
}

function* cardDeleteFlow(action) {
	try {
		const { client, list, card } = action
		const deletedCard = yield call(cardApi, client, list, card, `${card._id}/delete`)
		yield put(cardDeleteSuccess(deletedCard))
		yield put(cardListDeleteSuccess(deletedCard))
	} catch(error) {
		yield put(cardDeleteError(error))
	}
}


function* cardUpdateFlow(action) {
	try {
		const { client, list, card } = action
		const updatedCard = yield call(cardApi, client, list, card, `${card._id}/update`)
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