import React, { Component } from 'react'
import { Router, Redirect, Route, Switch } from "react-router-dom";
import Signup from './signup/SignupContainer';
import Login from './login';
import DashboardContainer from './dashboard/DashboardContainer';
import Navbar from './navbar/Navbar';
import history from './lib/history'

import {
  checkDashboardAuthorization,
} from './lib/check-auth';


class App extends Component {


  render() {

    return (
      <Router history={history}>
        <Switch>
        	<Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/dashboard' component={DashboardContainer} />
          />
        </Switch>
      </Router>
    )
  }
}


export default App