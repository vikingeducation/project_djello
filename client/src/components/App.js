import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import LoginForm from "./LoginForm";
import DashboardContainer from "../containers/DashboardContainer";
import "../App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {}
    };
  }

  loginSubmit = async e => {
    e.preventDefault();
    try {
      const loginParams = {
        email: e.target.email.value,
        password: e.target.password.value
      };

      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginParams)
      });

      const parsedResponse = await response.json();

      this.setState({ loggedIn: true, user: parsedResponse });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? (
          <DashboardContainer />
        ) : (
          <LoginForm onSubmit={this.loginSubmit} />
        )}
      </div>
    );
  }
}

export default App;
