import { combineReducers } from 'redux';
import {user} from './auth';

const djelloApp = combineReducers({
  user
});

export default djelloApp;