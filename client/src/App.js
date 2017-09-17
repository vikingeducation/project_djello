import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "./actions/user";

//testing var
// import { TESTING } from "./index";

import { BrowserRouter as Router } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginContainer from "./Containers/LoginContainer";
import BoardsIndexContainer from "./Containers/BoardsIndexContainer";
import BoardShowContainer from "./Containers/BoardShowContainer";
import Appbar from "./Components/Appbar";
import LoggedIn from "./Components/elements/LoggedIn";
import LoggedOut from "./Components/elements/LoggedOut";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  onLogout = e => {
    //do a thing
    console.log("logout = ", e);
    console.log("this = ", this);
    this.props.logoutUser();
  };
  onLogin = e => {
    //do a thing
  };
  render = () => {
    console.log("state in app = ", this.props);
    // console.log("TESTING = ", TESTING);
    // const loggedIn = TESTING ? true : this.props.user.loggedIn;
    const loggedIn = this.props.user.loggedIn;
    console.log("loggedIn = ", loggedIn, ", user = ", this.props.user);
    const bIndexWithProps = () => (
      <BoardsIndexContainer boards={this.props.user.boards} />
    );
    const bShowWithProps = () => (
      <BoardShowContainer boards={this.props.user.boards} />
    );
    return (
      <Router>
        <div className="App">
          {/* <Dashboard /> */}
          <Appbar
            loggedIn={loggedIn}
            onLogin={this.onLogin}
            onLogout={this.onLogout}
          />
          {/* if logged in */}
          <LoggedIn user={loggedIn}>
            <Switch>
              {/* boards index page */}
              <Route exact path="/" render={bIndexWithProps} />
              {/* board show page */}
              <Route path="/boards/:id" render={bShowWithProps} />
              {/* not found */}
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </LoggedIn>
          {/* if not logged in */}
          <div id="formContainer" className="flex-center">
            <LoggedOut user={loggedIn}>
              <Switch>
                <Route exact path="/" component={LoginContainer} />
                <Route path="*" render={() => <Redirect to="/" />} />
              </Switch>
              {/* <LoginContainer /> */}
            </LoggedOut>
          </div>
        </div>
      </Router>
    );
  };
}

const mapStateToProps = state => {
  return {
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
