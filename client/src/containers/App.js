import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { withRouter } from "react-router";
import Login from "../components/Login";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import { loginUser, logoutUser } from "../actions/auth";

class App extends Component {
  render() {
    const {
      isAuthenticated,
      errorMessage,
      onLogoutClick,
      onLoginClick,
      user
    } = this.props;
    return (
      <Router>
        <div>
          <Navbar
            onLogoutClick={onLogoutClick}
            isAuthenticated={isAuthenticated}
            user={user}
          />
          <Route
            path="/login"
            render={() => (
              <Login
                errorMessage={errorMessage}
                onLoginClick={onLoginClick}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/"
            component={Main}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </Router>
    );
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    path={rest.path}
    render={props => {
      return rest.isAuthenticated
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />;
    }}
  />
);

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user } = auth;

  return {
    isAuthenticated,
    errorMessage,
    user
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onLoginClick: creds => {
      dispatch(loginUser(creds));
    },
    onLogoutClick: () => {
      dispatch(logoutUser());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
