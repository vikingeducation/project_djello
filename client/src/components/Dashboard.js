import { Route, Switch } from "react-router-dom";
import React from "react";
import AppBar from "material-ui/AppBar";
import Boards from "./Boards";
import FlatButton from "material-ui/FlatButton";

const Dashboard = ({ logOut, user, boards }) => {
  return (
    <div>
      <AppBar
        title="Djello"
        iconElementRight={
          <div>
            <h1>
              Welcome, {user.firstName}!
            </h1>
            <FlatButton label="Log Out" onClick={logOut} />
          </div>
        }
      />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Boards boards={boards} user={user} />}
        />
      </Switch>
    </div>
  );
};

export default Dashboard;
