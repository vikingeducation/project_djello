import React from "react";

import muiThemeable from "material-ui/styles/muiThemeable";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import AssignmentIcon from "material-ui/svg-icons/action/assignment";

const Navbar = props => {
  return (
    <AppBar
      iconElementLeft={
        <IconButton>
          <AssignmentIcon />
        </IconButton>
      }
      title={<span>Djello</span>}
      iconElementRight={<FlatButton label="login" />}
    />
  );
};

export default Navbar;
