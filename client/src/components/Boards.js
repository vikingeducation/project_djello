import React from "react";
import BoardContainer from "../containers/BoardContainer";

const Boards = ({ boards, user }) =>
  <BoardContainer boards={boards} user={user} />;

export default Boards;
