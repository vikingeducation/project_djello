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
  BOARD_USER,
  BOARD_CREATE_START,
  BOARD_CREATE_RESULTS,
  BOARD_CREATE_ERROR,
  LIST_SHOW_ERROR,
  LIST_SHOW_RESULTS,
  LIST_SHOW_START,
  LIST_CREATE_ERROR,
  LIST_CREATE_RESULTS,
  LIST_CREATE_START,
  CARD_CREATE_ERROR,
  CARD_CREATE_RESULTS,
  CARD_CREATE_START
} from "../actions";

const initialState = {
  users: [],
  user: {
    id: 1,
    firstName: "Foo0",
    lastName: "Bar0",
    email: "foobar0@gmail.com",
    accessToken: "0",
    password: "0",
    createdAt: "2018-01-16T02:12:20.535Z",
    updatedAt: "2018-01-16T02:12:20.535Z",
    Boards: [
      {
        id: 1,
        name: "Foo1's First Board'",
        userId: 1,
        createdAt: "2018-01-16T02:12:20.554Z",
        updatedAt: "2018-01-16T02:12:20.554Z"
      }
    ]
  },
  boards: [],
  lists: [],
  cards: [],
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
        users: action.data,
        isFetching: false,
        results: "Test Succeeded!  " + JSON.stringify(action.data)
      };
    case USER_ALL_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + JSON.stringify(action.data)
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
        user: action.data,
        isFetching: false,
        results: "Test Succeeded!  " + JSON.stringify(action.data)
      };
    case USER_ONE_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + JSON.stringify(action.data)
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
        results: "Test Succeeded!  " + JSON.stringify(action.data)
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + JSON.stringify(action.data)
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
        results: "Test Succeeded!  " + JSON.stringify(action.data)
      };
    case USER_ADD_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + JSON.stringify(action.data)
      };
    case BOARD_DELETE_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case BOARD_DELETE_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + JSON.stringify(action.data)
      };
    case BOARD_CREATE_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case BOARD_CREATE_RESULTS:
      return {
        ...state,
        user: action.data, //action.data is the user
        isFetching: false,
        results: "Test Succeeded!  " + JSON.stringify(action.data)
      };
    case BOARD_CREATE_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + JSON.stringify(action.data)
      };
    case LIST_SHOW_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case LIST_SHOW_RESULTS:
      return {
        ...state,
        lists: action.data,
        isFetching: false,
        results: "Test Succeeded!  " + JSON.stringify(action.data)
      };
    case LIST_SHOW_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + JSON.stringify(action.data)
      };
    case LIST_CREATE_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case LIST_CREATE_RESULTS:
      return {
        ...state,
        lists: [...state.lists, action.data],
        isFetching: false,
        results: "Test Succeeded!  " + JSON.stringify(action.data)
      };
    case LIST_CREATE_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + JSON.stringify(action.data)
      };
    case CARD_CREATE_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case CARD_CREATE_RESULTS:
      return {
        ...state,
        cards: [...state.cards, action.data],
        isFetching: false,
        results: "Test Succeeded!  " + JSON.stringify(action.data)
      };
    case CARD_CREATE_ERROR:
      return {
        ...state,
        isFetching: false,
        results: "Test Failed!  " + JSON.stringify(action.data)
      };
    default:
      return state;
  }
};

export default demo;
