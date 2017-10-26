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
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDkwMzU2NzksInN1YiI6NzJ9.cIGAQ5ij8Ya19Q0lAAc3QtSH2GElhfbaLBEE5omSdJo',
    isLoggedIn: true
  }
}


const store = createStore(index, login, applyMiddleware(thunk));
// const store = createStore(index, applyMiddleware(thunk));


ReactDOM.render(

  <Provider store={store}>
  <Authenticator />
   </Provider>, document.getElementById('root'))