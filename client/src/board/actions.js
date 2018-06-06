import {
	BOARD_CREATING,
	BOARD_CREATE_SUCCESS,
	BOARD_CREATE_ERROR,
	BOARD_REQUESTING,
	BOARD_REQUEST_SUCCESS,
	BOARD_REQUEST_ERROR
} from './constants';

export const boardCreate = function boardCreate(client, board) {
	return {
		type: BOARD_CREATING,
		client,
		board,
	}
}

export const boardCreateSuccess = function boardCreateSuccess(board) {
	return {
		type: BOARD_CREATE_SUCCESS,
		board
	}
}

export const boardCreateError = function boardCreateError(error) {
	return {
		type: BOARD_CREATE_ERROR,
		error
	}
}

export const boardRequest = function boardRequest(client) {
	return {
		type: BOARD_REQUESTING,
		client
	}
}

export const boardRequestSuccess = function boardRequestSuccess(boards) {
	return {
		type: BOARD_REQUEST_SUCCESS,
		boards
	}
}

export const boardRequestError = function boardRequestError(error) {
	return {
		type: BOARD_REQUEST_ERROR,
		error
	}
}