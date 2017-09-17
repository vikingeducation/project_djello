import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import DropDownMenu from "material-ui/DropDownMenu";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

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

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class Appbar extends Component {
  constructor(props) {
    super(props);
    // this.onLogout = props.onLogout;
    // this.onLogin = props.onLogin;
  }
  render() {
    const { onLogout, onLogin } = this.props;
    const logBtn = this.props.loggedIn ? (
      <Logout onClick={onLogout} />
    ) : (
      <Login onClick={onLogin} />
    );

    //toolbar version
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Djello" />
          <IconButton tooltip="dashboard" tooltipPosition="bottom-center">
            <i className="material-icons">dashboard</i>
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <IconButton tooltip="settings" tooltipPosition="bottom-center">
            <i className="material-icons">settings</i>
          </IconButton>
          <IconButton tooltip="settings" tooltipPosition="bottom-center">
            {logBtn}
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Appbar;
