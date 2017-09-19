import {authReducer} from './authReducer.js'
import {userReducer} from './userReducer.js'
import {combineReducers} from 'redux'

export default combineReducers({
  authReducer, 
  userReducer
})