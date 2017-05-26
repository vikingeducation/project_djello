import React from "react";
import Lists from "./Lists";

const Board = ({ boards, currentBoard }) => {
  boards ? console.log("Boards", boards, currentBoard) : null;
  return (
    <div>
      <h1>{currentBoard.title}</h1>

      {currentBoard.Lists
        ? <Lists lists={currentBoard.Lists} />
        : <p>Loading...</p>}
    </div>
  );
};

export default Board;
