import React from "react";

const BoardElement = ({ board, onClick }) => {
  return (
    <div className="Board">
      <h2>{board.name}</h2>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => onClick(board.id)}
      >
        Delete Board!
      </button>
    </div>
  );
};

export default BoardElement;
