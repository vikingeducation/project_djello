import {
	DATA_REQUESTING,
	DATA_REQUEST_SUCCESS,
	DATA_REQUEST_ERROR,
} from './constants';

export const dataRequest = function(client) {
	return {
		type: DATA_REQUESTING,
		client
	}
}

export const dataRequestSuccess = function(data) {
	return {
		type: DATA_REQUEST_SUCCESS,
		data
	}
}

export const dataRequestError = function(error) {
	return {
		type: DATA_REQUEST_ERROR,
		error,
	}
}