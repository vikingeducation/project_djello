import React from "react";
import Input from "./elements/Input";
import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";
import { MuiThemeProvider } from "material-ui";

const LoginForm = ({
  usernameInputValue,
  passwordInputValue,
  onInputChange,
  onButtonClick,
  userNotFound
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column-nowrap",
        justifyContent: "center",
        marginTop: "200px"
      }}
    >
      {userNotFound ? <h1>{userNotFound}</h1> : null}
      <MuiThemeProvider>
        <AppBar title={`Welcome To Djello!`} showMenuIconButton={false}>
          <form>
            <Input
              floatingLabelStyle={{ color: "white" }}
              value={usernameInputValue}
              onChange={onInputChange}
              name="username"
              type="text"
            />
            <Input
              floatingLabelStyle={{ color: "white" }}
              value={passwordInputValue}
              onChange={onInputChange}
              name="password"
              type="password"
            />
            <MuiThemeProvider>
              <RaisedButton
                primary={true}
                disabled={
                  !usernameInputValue.length || !passwordInputValue.length
                }
                style={{ margin: "70px" }}
                onClick={e => {
                  e.preventDefault();
                  onButtonClick();
                }}
                type="submit"
              >
                Go!
              </RaisedButton>
            </MuiThemeProvider>
          </form>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
};

export default LoginForm;
