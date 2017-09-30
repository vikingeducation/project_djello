import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";

import { Link } from "react-router-dom";

class Login extends Component {
  static muiName = "FlatButton";

  render() {
    return <FlatButton {...this.props} label="Login" />;
  }
}
class Logout extends Component {
  static muiName = "FlatButton";

  render() {
    return <FlatButton {...this.props} label="logout" />;
  }
}

class Appbar extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.onLogout = props.onLogout;
  //   // this.onLogin = props.onLogin;
  // }
  render() {
    const { onLogout, onLogin } = this.props;
    const logBtn = this.props.loggedIn ? (
      <Logout onClick={onLogout} />
    ) : (
      <Login onClick={onLogin} />
    );

    return (
      <div>
        <AppBar
          title="Djello"
          iconElementLeft={
            <Link to="/">
              <IconButton tooltip="dashboard" tooltipPosition="bottom-center">
                <i className="material-icons">dashboard</i>
              </IconButton>
            </Link>
          }
          iconElementRight={
            <IconButton tooltip="settings" tooltipPosition="bottom-center">
              <i className="material-icons">settings</i>
            </IconButton>
          }
          iconElementRight={logBtn}
        />
      </div>
    );
  }
}

export default Appbar;
