import React from "react";
import Paper from "material-ui/Paper";

const style = {
  height: 100,
  width: 300,
  margin: "2.5%",
  textAlign: "center",
  backgroundColor: "green"
};

export default ({ board, getLists }) =>
  <Paper style={style} zDepth={2} onClick={getLists}>
    <h2>
      {board.title}{" "}
    </h2>
  </Paper>;
