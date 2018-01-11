import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import About from "./About";
import UserContainer from "../containers/PeopleContainer";

const NavLinks = () => (
  <div className="NavLinks">
    <NavLink activeClassName="active" exact to="/">
      Home
    </NavLink>{" "}
    <NavLink activeClassName="active" exact to="/about">
      About
    </NavLink>{" "}
  </div>
);

const App = () => (
  <Router>
    <div>
      <NavLinks />
      <Switch>
        <Route exact path="/" component={UserContainer} />
        <Route path="/about" component={About} />
        <Route render={() => <h1>Loading...</h1>} />
      </Switch>
    </div>
  </Router>
);

export default App;
