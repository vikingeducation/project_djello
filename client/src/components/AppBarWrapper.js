import React from "react";
import AppBar from "material-ui/AppBar";
import LogOutButton from "./LogOutButton";

const AppBarContainer = ({ name, onClick, handleDrawerOpen }) =>
  <AppBar
    title="Djello"
    onLeftIconButtonTouchTap={handleDrawerOpen}
    iconElementRight={<LogOutButton name={name} onClick={onClick} />}
  />;

export default AppBarContainer;
