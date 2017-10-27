import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import { colorPrimary3 } from "../styles/styles.js";
import { Link } from "react-router-dom";

const appBarStyle = {
  position: "fixed",
  zIndex: "10",
  height: "60px",
  top: "0px",
  left: "0px",
  width: "100%"
  // backgroundColor: colorPrimary3
};

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
  render() {
    const { onLogout, onLogin } = this.props;
    const logBtn = this.props.loggedIn ? (
      <Logout onClick={onLogout} />
    ) : (
      <Login onClick={onLogin} />
    );

    return (
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
          <Link to="/settings">
            <IconButton tooltip="settings" tooltipPosition="bottom-center">
              <i className="material-icons">settings</i>
            </IconButton>
          </Link>
        }
        iconElementRight={logBtn}
        style={appBarStyle}
      />
    );
  }
}

export default Appbar;
