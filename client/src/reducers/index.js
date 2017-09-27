import user from "./user";
import board from "./board";
import list from "./list";
import card from "./card";
import { createStore, applyMiddleware, combineReducers } from "redux";

const rootReducer = combineReducers({ user, board, list, card });

export default rootReducer;
