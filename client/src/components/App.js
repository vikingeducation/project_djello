import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/test" render={() => <p>test</p>} />
            <Route exact path="/" render={() => <p>initail test</p>} />
            <Route render={() => <p>default component here</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
