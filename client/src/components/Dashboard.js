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
        render={props =>
          <BoardDashboard
            board={
              boards.filter(
                board => board._id === props.match.params.board_id
              )[0]
            }
          />}
      />
    </div>
  );
};

export default Dashboard;
