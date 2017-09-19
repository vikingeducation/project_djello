import { Route } from "react-router-dom";
import React from "react";
import AppBarWrapper from "./AppBarWrapper";
import BoardsContainer from "../containers/BoardsContainer";
import BoardDashboard from "./BoardDashboard";

const Dashboard = ({ logOut, props, match, location }) => {
  return (
    <div>
      <AppBarWrapper
        title="Djello"
        name={props.user ? props.user.firstName : null}
        onClick={logOut}
      />
      <Route
        exact
        path="/"
        render={() =>
          <BoardsContainer user={props.user} boards={props.boards} />}
      />
      <Route
        path="/boards/:board_id"
        render={() =>
          <BoardDashboard
            board={
              props.boards.filter(
                board => board._id === match.params.board_id
              )[0]
            }
            path={location.pathname.split("/")[2]}
          />}
      />
    </div>
  );
};

export default Dashboard;
