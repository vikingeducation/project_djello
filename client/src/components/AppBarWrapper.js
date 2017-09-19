import React from "react";
import AppBar from "material-ui/AppBar";
import LogOutButton from "./LogOutButton";

const styles = {
  AppBar: {
    height: 75,
    display: "flex",
    justifyContent: "space-between",
    color: "white"
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
    <LogOutButton onClick={onClick} />
  </AppBar>;

export default AppBarContainer;
