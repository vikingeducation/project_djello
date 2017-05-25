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
import { loginUser, logoutUser } from "../actions/auth";

class App extends Component {
  render() {
    const {
      isAuthenticated,
      errorMessage,
      onLogoutClick,
      onLoginClick
    } = this.props;
    return (
      <Router>
        <div>
          <Route
            path="/login"
            render={() => (
              <Login
               errorMessage={errorMessage}
                onLoginClick={onLoginClick}
              />
            )}
          />
          <PrivateRoute
            exact path="/"
            component={Main}
            onLogoutClick={onLogoutClick}
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
      return localStorage.getItem("id_token")
        ? <Component {...props} onLogoutClick={rest.onLogoutClick} />
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
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage
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
