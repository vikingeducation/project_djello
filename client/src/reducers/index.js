import { combineReducers } from "redux";
import { user } from "./auth";
import { allBoards } from "./allBoards";
import { specificBoard } from "./specificBoard";
import { lists } from "./lists";

const djelloApp = combineReducers({
  user,
  allBoards,
  specificBoard,
  lists
});

export default djelloApp;
