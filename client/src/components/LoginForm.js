import React from "react";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import AlertModal from "./AlertModal";

export const LoginForm = props => {
  console.log(props);
  return (
    <div>
      <AppBar title="Login" />
      {props.loginFailureMessage
        ? <AlertModal loginFailureMessage={props.loginFailureMessage} />
        : null}
      <Paper zDepth={2} style={{ marginTop: 50, width: 500 }}>
        <form>
          <TextField
            hintText="Hint Text"
            type="text"
            floatingLabelText="Username"
            onChange={props.handleInputChange}
            name="username"
          />
          <Divider />
          <TextField
            hintText="Hint Text"
            type="password"
            floatingLabelText="Password"
            onChange={props.handleInputChange}
            name="password"
          />
          <Divider />
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={() =>
              props.login({
                username: props.username,
                password: props.password
              })}
          />
        </form>
      </Paper>
    </div>
  );
};
