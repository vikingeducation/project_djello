import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch
} from "react-router-dom";
import About from "./../About/About";
import classnames from "classnames";
import logo from "./logo.svg";
import "./style.css";
import AddUserContainer from "./../../containers/UserContainer";
import LoginContainer from "./../../containers/LoginContainer";
import BoardContainer from "./../../containers/BoardContainer";

const NavLinks = () => (
  <div className="NavLinks">
    <NavLink activeClassName="active" exact to="/">
      Home
    </NavLink>{" "}
    <NavLink activeClassName="active" exact to="/signup">
      Sign Up
    </NavLink>{" "}
    <NavLink activeClassName="active" exact to="/about">
      About
    </NavLink>{" "}
  </div>
);

class App extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Djello!</h2>
        </div>
        <div style={{ padding: "30px" }}>
          Current User:{JSON.stringify(this.props.user)}
        </div>
        <p className="App-intro">
          Plan: do boards -> lists -> cards/modal -> login
        </p>
        <NavLinks />
        <br />
        <br />
        <button onClick={this.props.actions.userAll}>Show All Users</button>
        <br />
        <br />
        <button onClick={this.props.getId}>Show One User</button>
        <br />
        <br />
        <LoginContainer />
        <br />
        <br />
        <AddUserContainer />
        <br />
        <br />
        <button onClick={this.props.actions.boardAll}>Show All Boards</button>
        <br />
        <br />
        <button onClick={this.props.actions.boardUser}>
          Show Current User's Boards
        </button>
        <br />
        <br />
        <BoardContainer />
        <br />
        <br />
        <div style={{ padding: "30px" }}>{this.props.results}</div>
      </div>
    );
  }
}

export default App;
