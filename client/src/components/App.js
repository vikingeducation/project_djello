import React, { Component } from "react";
import LoginForm from "./LoginForm";
import DashboardContainer from "../containers/DashboardContainer";
import "../App.css";

class App extends Component {
  loginSubmit = async e => {
    e.preventDefault();
    this.props.loginUser(e.target.email.value, e.target.password.value);
  };

  render() {
    return (
      <div className="App">
        {this.props.user.username ? (
          <DashboardContainer user={this.props.user} />
        ) : (
          <LoginForm onSubmit={this.loginSubmit} />
        )}
      </div>
    );
  }
}

export default App;
