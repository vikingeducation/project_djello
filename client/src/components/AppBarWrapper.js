import React from "react";
import AppBar from "material-ui/AppBar";
import LogOutButton from "./LogOutButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

const styles = {
  AppBar: {
    height: 75,
    display: "flex",
    justifyContent: "space-between"
  },
  h2: {
    textAlign: "center"
  }
};

const AppBarContainer = ({ name, onClick, handleDrawerOpen }) =>
  <AppBar
    style={styles.AppBar}
    title="Djello"
    onLeftIconButtonTouchTap={handleDrawerOpen}
  >
    <h2>
      Welcome, {name}!
    </h2>
    <LogOutButton name={name} onClick={onClick} />
  </AppBar>;

export default AppBarContainer;
