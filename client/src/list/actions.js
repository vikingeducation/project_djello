import {
	LIST_CREATING,
	LIST_CREATE_SUCCESS,
	LIST_CREATE_ERROR,
	LIST_SET,
	LIST_SET_CURRENT,
	LIST_UPDATING,
	LIST_UPDATE_SUCCESS,
	LIST_UPDATE_ERROR,
	LIST_DELETING,
	LIST_DELETE_SUCCESS,
	LIST_DELETE_ERROR,
	CARD_LIST_CREATE_SUCCESS,
	CARD_LIST_DELETE_SUCCESS,
	BOARD_LIST_DELETE_SUCCESS,
} from './constants';

export const listCreate = function listCreate(client, list) {
	return {
		type: LIST_CREATING,
		client,
		list,
	}
}

export const listCreateSuccess = function listCreateSuccess(list) {
	return {
		type: LIST_CREATE_SUCCESS,
		list
	}
}

export const listCreateError = function listCreateError(error) {
	return {
		type: LIST_CREATE_ERROR,
		error
	}
}

export const listSet = function listSet(lists) {
	return {
		type: LIST_SET,
		lists
	}
}

export const listSetCurrent= function listSetCurrent(list) {
	return {
		type: LIST_SET_CURRENT,
		list
	}
}

export const listUpdate = function listUpdate(client, list) {
	return {
		type: LIST_UPDATING,
		client,
		list
	}
}

export const listUpdateSuccess = function listUpdateSuccess(list) {
	return {
		type: LIST_UPDATE_SUCCESS,
		list
	}
}

export const listUpdateError = function listUpdateError(error) {
	return {
		type: LIST_UPDATE_ERROR,
		error
	}
}

export const listDelete = function listDelete(client, list) {
	return {
		type: LIST_DELETING,
		client,
		list,
	}
}

export const listDeleteSuccess = function listDeleteSuccess(list) {
	return {
		type: LIST_DELETE_SUCCESS,
		list
	}
}

export const listDeleteError = function listDeleteError(error) {
	return {
		type: LIST_DELETE_ERROR,
		error
	}
}

export const cardListCreateSuccess = function(card) {
	return {
		type: CARD_LIST_CREATE_SUCCESS,
		card
	}
}

export const cardListDeleteSuccess = function(card) {
	return {
		type: CARD_LIST_DELETE_SUCCESS,
		card
	}
}

export const boardListDeleteSuccess = function(board) {
	return {
		type: BOARD_LIST_DELETE_SUCCESS,
		board
	}
}