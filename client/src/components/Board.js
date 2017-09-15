import React from "react";
import Paper from "material-ui/Paper";
import AppBar from "material-ui/AppBar";
import ContentCreate from "material-ui/svg-icons/content/create";

const style = {
  height: 100,
  width: "25%",
  margin: "2.5%",
  textAlign: "center",
  display: "flex"
};

export default ({ board }) =>
  <Paper style={style} zDepth={2}>
    <AppBar title={board.title} />
  </Paper>;
