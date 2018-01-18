import React from "react";
import ListsContainer from "./../../containers/ListsContainer";

const BoardElement = ({ board, onClick, user }) => {
  return (
    <div className="Board">
      <h2>{board.name}</h2>
      <ListsContainer board={board} />
      <button
        className="btn btn-sm btn-danger"
        onClick={() => onClick(board.id, user.id)}
      >
        Delete Board
      </button>
    </div>
  );
};

export default BoardElement;
