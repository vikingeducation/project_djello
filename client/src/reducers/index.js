import { combineReducers } from "redux";
import auth from "./authReducer";
import boards from "./boardsReducer";
// We combine the reducers here so that they
// can be left split apart above
const djelloApp = combineReducers({
  auth,
  boards
});

export default djelloApp;
