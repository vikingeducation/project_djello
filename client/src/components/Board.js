import React from "react";
import Paper from "material-ui/Paper";
import AppBar from "material-ui/AppBar";

const style = {
  height: 100,
  width: "300",
  margin: "2.5%",
  textAlign: "center",
  backgroundColor: "green"
};

export default ({ board }) =>
  <Paper style={style} zDepth={2}>
    <h2>
      {board.title}{" "}
    </h2>
  </Paper>;
