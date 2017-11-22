import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/test" render={() => <p>test</p>} />
            <Route path="/" render={() => <p>initail test</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
