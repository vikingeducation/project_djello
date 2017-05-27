import React from "react";
import Lists from "./Lists";
import CreateListContainer from "../containers/CreateListContainer";

const Board = ({ boards, currentBoard, deleteList, updateList }) => {
  boards ? console.log("Boards", boards, currentBoard) : null;
  return (
    <div>
      {NoBoards(boards, currentBoard, deleteList, updateList)}
    </div>
  );
};

const NoBoards = (boards, currentBoard, deleteList, updateList) => {
  if (!boards || !boards.length) {
    return <p>No Boards...</p>;
  } else if (currentBoard && currentBoard.Lists) {
    return (
      <div>
        <br />
        <h1>{currentBoard.name}</h1>
        <br />
        <CreateListContainer />
        <br />
        <Lists
          currentBoard={currentBoard}
          deleteList={deleteList}
          updateList={updateList}
        />

      </div>
    );
  } else {
    return (
      <div>
        <br />
        <h1>{currentBoard.name}</h1>
        <br />
        <CreateListContainer />
        <br />
        <p> No lists...</p>

      </div>
    );
  }
};
export default Board;
