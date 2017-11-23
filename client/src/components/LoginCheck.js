import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Cookies from "js-cookie";
import SignupContainer from "../containers/SignupContainer";
import LoginContainer from "../containers/LoginContainer";
import { setCookie } from "../actions";
import { connect } from "react-redux";
import Button from "./elements/Button";

class LoginCheck extends Component {
  componentWillMount() {
    const { setCookieInfo } = this.props;
    //If cookie
    if (Cookies.get("key")) {
      //Check with server
      fetch("/cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          signature: Cookies.get("key")
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error with api");
          }
        })
        .then(isGood => {
          if (isGood.data.match) {
            setCookieInfo(Cookies.get("key"));
          } else {
            Cookies.remove("key");
            setCookieInfo("");
          }
        })
        .catch(e => {
          console.log("What?", e.stack);
        });
    }
  }

  render() {
    const { cookie, logout } = this.props;
    let routes = (
      <Switch>
        <Route exact path="/" component={LoginContainer} />
        <Route exact path="/signup" component={SignupContainer} />
        <Route render={() => <p>Incorrect Url</p>} />
      </Switch>
    );
    if (cookie) {
      routes = (
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      );
    }
    return (
      <Router>
        <div>
          <header>
            Djello {cookie ? "Welcome " + cookie.split(":")[0] : ""}
            {cookie ? (
              <Button color="danger" onClick={logout}>
                Logout
              </Button>
            ) : (
              ""
            )}
          </header>
          {routes}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    cookie: state.cookie
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCookieInfo: cookie => {
      dispatch(setCookie(cookie));
    },
    logout: e => {
      Cookies.remove("key");
      dispatch(setCookie(""));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCheck);
