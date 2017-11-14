// index.js
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import './stylesheets/index.scss'
import LoginContainer from './containers/LoginContainer'
import Authenticator from './containers/Authenticator'
import index from './reducers/index'

// so we don't have to keep signing in in development mode
const login = {
  auth: {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTA3OTUwNTEsInN1YiI6Mzl9._zoxkWBAI54_RcdMNtx1MhUFRgam0NPO96tf3QLFGCI',
    isLoggedIn: true
  }
}


const store = createStore(index, login, applyMiddleware(thunk));


ReactDOM.render(

  <Provider store={store}>
  <Authenticator />
   </Provider>, document.getElementById('root'))