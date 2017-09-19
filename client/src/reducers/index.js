import * as Actions from "../actions";
import { boards } from "./boards";
import { combineReducers } from "redux";

const initialState = {
  fetching: false,
  loggedIn: localStorage.getItem("token") || false,
  user: ""
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case Actions.START_AWAIT_LOGIN:
      return {
        ...state,
        fetching: true
      };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.data,
        fetching: false
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        loginFailureMessage: action.data,
        fetching: false
      };
    case Actions.LOG_OUT:
      return {
        ...state,
        user: {},
        loggedIn: false
      };
    default:
      return state;
  }
};

export default combineReducers({ app, boards });
