import { combineReducers } from 'redux'
import auth from './authReducer'

const index = combineReducers({
  auth
})

export default index