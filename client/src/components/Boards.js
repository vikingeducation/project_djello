import React from "react";
import Board from "../components/Board";
import BoardContainer from "../containers/BoardContainer";

const Boards = ({ boards, user }) =>
  <BoardContainer boards={boards} user={user} />;

export default Boards;
