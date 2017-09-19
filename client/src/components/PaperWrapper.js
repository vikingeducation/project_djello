import React from "react";
import Paper from "material-ui/Paper";

const style = {
  width: "100%",
  display: "flex",
  flexWrap: "wrap"
};

const PaperWrapper = ({ children }) =>
  <Paper style={style} zDepth={3}>
    {children}
  </Paper>;

export default PaperWrapper;
