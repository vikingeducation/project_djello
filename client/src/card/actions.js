import {
	CARD_CREATING,
	CARD_CREATE_SUCCESS,
	CARD_CREATE_ERROR,
	CARD_UPDATING,
	CARD_UPDATE_SUCCESS,
	CARD_UPDATE_ERROR,
	CARD_DELETING,
	CARD_DELETE_SUCCESS,
	CARD_DELETE_ERROR,
	CARD_SET,
	LIST_CARD_DELETE_SUCCESS,
	BOARD_LIST_CARD_DELETE_SUCCESS
} from './constants';

export const cardCreate = function cardCreate(client, list, card) {
	return {
		type: CARD_CREATING,
		client,
		list,
		card,
	}
}

export const cardCreateSuccess = function cardCreateSuccess(card) {
	return {
		type: CARD_CREATE_SUCCESS,
		card
	}
}

export const cardCreateError = function cardCreateError(error) {
	return {
		type: CARD_CREATE_ERROR,
		error
	}
}

export const cardUpdate = function cardUpdate(client, list, card) {
	return {
		type: CARD_UPDATING,
		client,
		list,
		card
	}
}

export const cardUpdateSuccess = function cardUpdateSuccess(card) {
	return {
		type: CARD_UPDATE_SUCCESS,
		card
	}
}

export const cardUpdateError = function cardUpdateError(error) {
	return {
		type: CARD_UPDATE_ERROR,
		error
	}
}

export const cardDelete = function cardDelete(client, list, card) {
	return {
		type: CARD_DELETING,
		client,
		list,
		card,
	}
}

export const cardDeleteSuccess = function cardDeleteSuccess(card) {
	return {
		type: CARD_DELETE_SUCCESS,
		card
	}
}

export const cardDeleteError = function cardDeleteError(error) {
	return {
		type: CARD_DELETE_ERROR,
		error
	}
}

export const cardSet = function cardSet(cards) {
	return {
		type: CARD_SET,
		cards
	}
}

export const listCardDeleteSuccess = function listCardDeleteSuccess(list) {
	return {
		type: LIST_CARD_DELETE_SUCCESS,
		list
	}
}

export const boardListCardDeleteSuccess = function boardListCardDeleteSuccess(board) {
	return {
		type: BOARD_LIST_CARD_DELETE_SUCCESS,
		board
	}
}