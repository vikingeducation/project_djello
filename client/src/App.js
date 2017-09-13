import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import LoginForm from "./components/LoginForm";
import "./App.css";

class App extends Component {
  loginSubmit = e => {
    e.preventDefault;
    fetch("/login", {
      method: "POST",
      body: new FormData(e.target)
    });
  };

  render() {
    return (
      <div className="App">
        <LoginForm onSubmit={this.loginSubmit} />
      </div>
    );
  }
}

export default App;
