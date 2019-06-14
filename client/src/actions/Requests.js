import {
  GET_REQUEST_SUCCESS,
  GET_REQUEST,
  GET_REQUEST_FAILURE
} from "./constents/types";

export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getRequestSuccess(data) {
  return {
    type: GET_REQUEST_SUCCESS,
    data
  };
}

export function getRequestFailure(error) {
  return {
    type: GET_REQUEST_FAILURE,
    error
  };
}
