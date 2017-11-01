import { combineReducers } from 'redux'
import auth from './authReducer'
import user from './userReducer'
import board from './boardReducer'
import list from './listReducer'
import card from './cardReducer'

const index = combineReducers({
  auth,
  user,
  board,
  list,
  card
})

export default index