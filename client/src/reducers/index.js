import { combineReducers } from 'redux';
import {user} from './auth';
import {boards} from './boards';

const djelloApp = combineReducers({
  user,
  boards
});

export default djelloApp;