import React, {Component} from "react";
import {connect} from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import App from "../components/App"

class AppContainer extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <Router>
        {User.Reducers}
        <App />
      </Router>
      </MuiThemeProvider>
    )
  }
}

mapStateToProps = state => {
  return {
    UserReducers: state.UserReducers;
  }
}

export default connect(mapStateToProps)(AppContainer);
