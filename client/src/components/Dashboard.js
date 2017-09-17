import { Route, Switch, withRouter } from "react-router-dom";
import React from "react";
import AppBar from "material-ui/AppBar";
import Boards from "./Boards";
import BoardDashboard from "./BoardDashboard";
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
      <Route
        exact
        path="/"
        render={() => <Boards boards={boards} user={user} />}
      />
      <Route
        path="/boards/:board_id"
        render={() => <BoardDashboard boards={boards} />}
      />
    </div>
  );
};

export default Dashboard;
