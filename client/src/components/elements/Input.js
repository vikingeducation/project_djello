import React from "react";
import TextField from "material-ui/TextField";
import { MuiThemeProvider } from "material-ui";

const Input = ({ value, onChange, type, name }) => {
  return (
    <MuiThemeProvider>
      <TextField
        value={value}
        onChange={e => onChange(e)}
        name={name}
        type={type}
        floatingLabelText={name}
      />
    </MuiThemeProvider>
  );
};

export default Input;
