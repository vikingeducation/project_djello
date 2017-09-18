import user from "./user";
import board from "./board";
import { createStore, applyMiddleware, combineReducers } from "redux";

const rootReducer = combineReducers({ user, board });

export default rootReducer;
