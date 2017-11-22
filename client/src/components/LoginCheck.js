import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Cookies from "js-cookie";

class Login extends Component {
  render() {
    Cookies.set("name", "larry");
    console.log(JSON.stringify(Cookies.get("name")));
    Cookies.remove("name");
    console.log(JSON.stringify(Cookies.get()));
    return (
      <Router>
        <div>
          <header>Djello</header>
          <Switch>
            {true ? (
              <Route path="/" component={App} />
            ) : (
              <Route path="/" render={() => <p>Logged out</p>} />
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Login;
