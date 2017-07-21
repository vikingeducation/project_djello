import { combineReducers } from "redux";
import { user } from "./auth";
import { allBoards } from "./allBoards";
import { specificBoard } from "./specificBoard";
import { lists } from "./lists";
import { currentCard } from "./currentCard";

const djelloApp = combineReducers({
  user,
  allBoards,
  specificBoard,
  lists,
  currentCard
});

export default djelloApp;
