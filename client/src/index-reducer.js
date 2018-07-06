import { combineReducers } from 'redux'  
import client from './client/reducer'  
import signup from './signup/reducer'  
import login from './login/reducer'
import user from './user/reducer'  
import board from './board/reducer'
import list from './list/reducer'
import card from './card/reducer'
import data from './dashboard/reducer';

const IndexReducer = combineReducers({  
  signup,
  client,
  login,
  data,
  user,
  board,
  list,
  card,
})


export default IndexReducer  