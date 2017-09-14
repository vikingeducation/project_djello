import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import LoginContainer from "./Containers/LoginContainer";

class App extends Component {
  render() {
    // const testing = <p>Testing</p>;
    return (
      <Router>
        <div className="App">
          <h1>App</h1>
          {/* if logged in */}
          {/* if not logged in */}
          <Switch>
            <Route exact path="/" component={LoginContainer} />
            {/* <Route exact path="/thing" component={testing} />
            <Route exact path="/testing" component={testing} /> */}
          </Switch>

          {/* <LoginContainer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
