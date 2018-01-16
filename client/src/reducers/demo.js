import {
  USER_ALL_START,
  USER_ALL_RESULTS,
  USER_ALL_ERROR,
  USER_ONE_START,
  USER_ONE_RESULTS,
  USER_ONE_ERROR,
  LOGIN_START,
  LOGIN_RESULTS,
  LOGIN_ERROR,
  USER_ADD_START,
  USER_ADD_RESULTS,
  USER_ADD_ERROR,
  BOARD_ALL_START,
  BOARD_ALL_RESULTS,
  BOARD_ALL_ERROR,
  BOARD_DELETE_START,
  BOARD_DELETE_RESULTS,
  BOARD_DELETE_ERROR,
  BOARD_USER_START,
  BOARD_USER_RESULTS,
  BOARD_USER_ERROR
} from "../actions";

const initialState = {
  users: [],
  user: null,
  boards: [],
  isFetching: false,
  error: null,
  results: ""
};

const demo = (state = initialState, action) => {
  switch (action.type) {
    case USER_ALL_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case USER_ALL_RESULTS:
      return {
        ...state,
        isFetching: false,
        results: "Test Succeeded!  " + action.data
      };
    case USER_ALL_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + action.data
      };
    case USER_ONE_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case USER_ONE_RESULTS:
      return {
        ...state,
        user: JSON.parse(action.data),
        isFetching: false,
        results: "Test Succeeded!  " + action.data
      };
    case USER_ONE_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + action.data
      };
    case LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case LOGIN_RESULTS:
      return {
        ...state,
        user: action.data,
        isFetching: false,
        results: "Test Succeeded!  " + action.data
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + action.data
      };
    case USER_ADD_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case USER_ADD_RESULTS:
      return {
        ...state,
        user: action.data,
        isFetching: false,
        results: "Test Succeeded!  " + action.data
      };
    case USER_ADD_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + action.data
      };
    case BOARD_ALL_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case BOARD_ALL_RESULTS:
      return {
        ...state,
        boards: JSON.parse(action.data),
        isFetching: false,
        results: "Test Succeeded!  " + action.data
      };
    case BOARD_ALL_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + action.data
      };
    case BOARD_DELETE_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case BOARD_DELETE_RESULTS:
      return {
        ...state,
        boards: JSON.parse(action.data),
        isFetching: false,
        results: "Test Succeeded!  " + action.data
      };
    case BOARD_DELETE_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + action.data
      };
    case BOARD_USER_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case BOARD_USER_RESULTS:
      return {
        ...state,
        boards: action.data,
        isFetching: false,
        results: "Test Succeeded!  " + action.data
      };
    case BOARD_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + action.data
      };
    default:
      return state;
  }
};

export default demo;
