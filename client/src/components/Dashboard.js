import { Route } from "react-router-dom";
import React from "react";
import AppBarWrapper from "./AppBarWrapper";
import BoardsContainer from "../containers/BoardsContainer";
import BoardDashboard from "./BoardDashboard";
import Drawer from "material-ui/Drawer";
import HardWareKeyboardBackspace from "material-ui/svg-icons/hardware/keyboard-backspace";
import { NavLink } from "react-router-dom";

const Dashboard = ({
  logOut,
  props,
  match,
  location,
  state,
  handleDrawerOpen
}) => {
  return (
    <div>
      <AppBarWrapper
        title="Djello"
        name={props.user ? props.user.firstName : null}
        onClick={logOut}
        handleDrawerOpen={handleDrawerOpen}
      />
      {state.drawerOpen
        ? <Drawer open="true">
            <HardWareKeyboardBackspace onClick={handleDrawerOpen} />
            {props.boards
              ? props.boards.map(board =>
                  <div>
                    <NavLink to={`boards/${board._id}`}>
                      {board.title}
                    </NavLink>
                    <br />
                  </div>
                )
              : null}
          </Drawer>
        : null}

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
