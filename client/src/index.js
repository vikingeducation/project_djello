// index.js
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import './stylesheets/index.scss'

const store = createStore(applyMiddleware(thunk));

ReactDOM.render(

  // <Provider store={store}>
  <div> app!</div>
  // </Provider>
  , document.getElementById('root'))