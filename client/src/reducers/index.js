import { combineReducers } from "redux";
import { user } from "./auth";
import { allUsers } from "./allUsers";
import { specificBoard } from "./specificBoard";
import { allBoards } from "./allBoards";
import { lists } from "./lists";
import { currentCard } from "./currentCard";

const djelloApp = combineReducers({
  user,
  allUsers,
  specificBoard,
  allBoards,
  lists,
  currentCard
});

export default djelloApp;
