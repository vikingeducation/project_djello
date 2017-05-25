import { combineReducers } from "redux";
import auth from './authReducer'
// We combine the reducers here so that they
// can be left split apart above
const djelloApp = combineReducers({
  auth
});

export default djelloApp;