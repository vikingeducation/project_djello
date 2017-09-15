import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";

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
    return (
      <div>
        <AppBar
          title="Djello"
          iconElementLeft={
            <div>
              <IconButton>
                <i className="material-icons">dashboard</i>
              </IconButton>
            </div>
          }
          iconElementRight={
            this.props.loggedIn ? (
              <Logout onClick={onLogout} />
            ) : (
              <Login onClick={onLogin} />
            )
          }
        />
      </div>
    );
  }
}

export default Appbar;
