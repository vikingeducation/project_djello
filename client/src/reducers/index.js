import { combineReducers } from 'redux'
import auth from './authReducer'
import user from './userReducer'

const index = combineReducers({
  auth,
  user
})

export default index