import user from "./user";
import { createStore, applyMiddleware, combineReducers } from "redux";

const rootReducer = combineReducers({ user });

export default rootReducer;
