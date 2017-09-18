import React from "react";
import Button from "./elements/Button";
import { withRouter } from "react-router-dom";
import BoardsMenuItem from "./BoardsMenuItem";
import AppBar from "material-ui/AppBar";
import { MuiThemeProvider } from "material-ui";

const BoardsMenu = ({ logOut, createBoard, selectBoard, user }) => {
  return (
    <MuiThemeProvider>
      <div style={{ textAlign: "center" }}>
        <AppBar
          title={`Your Boards / Welcome, ${user.email.split("@")[0]}`}
          showMenuIconButton={false}
        />
        <Button onClick={logOut} text="Log Out" />
        <Button onClick={createBoard} text="Create New Board" />
        {user.boards.map(b => (
          <BoardsMenuItem b={b} key={b._id} onClick={selectBoard(b._id)} />
        ))}
      </div>
    </MuiThemeProvider>
  );
};

export default BoardsMenu;
