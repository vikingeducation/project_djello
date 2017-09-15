import React from "react";
import Paper from "material-ui/Paper";
import AppBar from "material-ui/AppBar";
import ContentAdd from "material-ui/svg-icons/content/add";

const style = {
  height: 100,
  width: "25%",
  margin: "2.5%",
  textAlign: "center",
  display: "flex"
};

export default ({ board, handleModalOpen }) =>
  <Paper style={style} zDepth={2}>
    <AppBar
      title="Add a board"
      iconElementRight={<ContentAdd />}
      onClick={handleModalOpen}
    />
  </Paper>;
