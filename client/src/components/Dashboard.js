import { Route } from "react-router-dom";
import React from "react";
import AppBarWrapper from "./AppBarWrapper";
import BoardsContainer from "../containers/BoardsContainer";
import BoardDashboard from "./BoardDashboard";

const Dashboard = ({ logOut, user, boards }) => {
  return (
    <div>
      <AppBarWrapper title="Djello" name={user.firstName} onClick={logOut} />
      <Route
        exact
        path="/"
        render={() => <BoardsContainer boards={boards} user={user} />}
      />
      <Route
        path="/boards/:board_id"
        render={() => <BoardDashboard boards={boards} />}
      />
    </div>
  );
};

export default Dashboard;
