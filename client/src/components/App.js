import React, { Component } from "react";
import Header from "./Header";
import LoginForm from "./LoginForm";
import DashboardContainer from "../containers/DashboardContainer";

class App extends Component {
  componentDidMount() {
    this.props.returningUser();
  }

  login = e => {
    e.preventDefault();
    this.props.loginUser(e.target.email.value, e.target.password.value);
  };
  render() {
    return (
      <div>
        <Header />
        {this.props.user.username ? (
          <DashboardContainer />
        ) : (
          <LoginForm onSubmit={this.login} />
        )}
      </div>
    );
  }
}

export default App;
