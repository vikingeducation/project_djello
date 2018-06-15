import React, { Component } from 'react'
import { Router, Redirect, Route, Switch } from "react-router-dom";
import Signup from './signup/SignupContainer';
import Login from './login';
import Dashboard from './dashboard/DashboardContainer';
import Board from './board/BoardContainer';
import history from './lib/history'

import {
  checkDashboardAuthorization,
} from './lib/check-auth';


class App extends Component {


  render() {

    const { store } = this.props;

    return (
      <Router history={history}>
        <Switch>
        	<Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/dashboard' component={Dashboard} />
          />
        </Switch>
      </Router>
    )
  }
}


export default App