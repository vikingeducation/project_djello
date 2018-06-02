import React, { Component } from 'react'
import { Router, Redirect, Route, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
import Signup from './signup';
import Login from './login'   
import Widgets from './widgets'
import history from './lib/history'  
import './App.css'

import {
  checkAuthorization,
  checkIndexAuthorization,
  checkWidgetAuthorization,
} from './lib/check-auth';


class App extends Component {


  render() {

    const { store } = this.props;

    return (
      <Router history={history}>
        <Switch>
        	<Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/widgets' render={() => checkWidgetAuthorization(store) ? 
            <Widgets /> :
            <Redirect to='/login' /> }
          />
        </Switch>
      </Router>
    )
  }
}


export default App