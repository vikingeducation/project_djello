import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { MuiThemeProvider } from "material-ui";

const Button = ({ text, onClick }) => (
  <MuiThemeProvider>
    <RaisedButton primary={true} onClick={onClick}>
      {text}
    </RaisedButton>
  </MuiThemeProvider>
);

export default Button;
