import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import LoginContainer from "./Containers/LoginContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>App</h1>
          <Switch>
            <Route exact path="/" component={LoginContainer} />
            <Route exact path="/thing" component={LoginContainer} />
            <Route exact path="/testing" component={LoginContainer} />
          </Switch>

          {/* <LoginContainer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
