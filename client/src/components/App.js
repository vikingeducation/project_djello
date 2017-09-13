import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import LoginForm from "./LoginForm";
import { BrowserRouter as Router } from "react-router-dom";

const style = {
  color: "#9E9E9E",
  fontSize: "16px",
  fontWeight: "normal"
};

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className="App">
            <div className="App-header">
              <h1>Welcome to Djello</h1>
              <br />
              <h3 style={style}>Please sign in to continue.</h3>
            </div>
            <LoginForm />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
