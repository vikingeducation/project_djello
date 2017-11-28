import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import BoardContainer from "../containers/BoardContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {this.props.location.pathname === "/signup" ? (
            <Redirect to="/" push />
          ) : (
            ""
          )}
          <Switch>
            <Route exact path="/test" render={() => <p>test</p>} />

            <Route exact path="/" component={BoardContainer} />
            <Route render={() => <p>default component here</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
