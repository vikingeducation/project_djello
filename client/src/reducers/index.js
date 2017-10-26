import { combineReducers } from 'redux'
import auth from './authReducer'
import user from './userReducer'
import board from './boardReducer'

const index = combineReducers({
  auth,
  user,
  board
})

export default index