import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginForm from "./LoginForm";

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          <h1>Welcome</h1>;
        }}
      />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="./register" component={LoginForm} />
    </Switch>
  );
};

export default Routes;
