import React from "react";
import Paper from "material-ui/Paper";
import { withRouter } from "react-router-dom";

const PaperWrapper = ({ children }) =>
  <Paper>
    {children}
  </Paper>;

export default withRouter(PaperWrapper);
