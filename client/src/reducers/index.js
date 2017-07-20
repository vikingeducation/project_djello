import { combineReducers } from "redux";
import { user } from "./auth";
import { allBoards } from "./allBoards";
import { specificBoard } from "./specificBoard";

const djelloApp = combineReducers({
  user,
  allBoards,
  specificBoard
});

export default djelloApp;
