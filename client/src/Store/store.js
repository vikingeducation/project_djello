import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";

const intialState = {
  user: {
    username: null,
    isFetching: false,
    loggedIn: false,
    error: null
  },
  board: {
    isFetching: false,
    error: null,
    success: null,
    board: null,
    boards: null
  },
  list: {
    isFetching: false,
    error: null,
    success: null,
    lists: null
  },
  card: {
    isFetching: false,
    error: null
    // success: null,
    // cards: null
  },
  isFetching: false,
  error: null
};

const store = createStore(rootReducer, intialState, applyMiddleware(thunk));
console.log("store created, ", store);
console.log("store initState = ", store.getState());
export default store;
