import { combineReducers } from 'redux'
import auth from './authReducer'
import user from './userReducer'
import board from './boardReducer'
import list from './listReducer'

const index = combineReducers({
  auth,
  user,
  board,
  list
})

export default index