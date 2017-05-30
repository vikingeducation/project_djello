import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

const Board = ({
  boards,
  currentBoard,
  deleteList,
  updateList,
  handleSubmitList,
  handleSubmitCard,
  updateCard,
  deleteCard,
  users
}) => {
  boards ? console.log("Boards", boards, currentBoard) : null;
  return (
    <div>
      {!boards || !boards.length
        ? <NoBoards />
        : <div>
            <br />
            <h1>{currentBoard.name}</h1><br />
            <CreateList
              handleSubmitList={handleSubmitList}
              currentBoard={currentBoard}
            />
            <br />
            {currentBoard.Lists.length
              ? <Lists
                  currentBoard={currentBoard}
                  deleteList={deleteList}
                  updateList={updateList}
                  handleSubmitCard={handleSubmitCard}
                  updateCard={updateCard}
                  deleteCard={deleteCard}
                  users={users}
                />
              : <NoLists />}

          </div>}

    </div>
  );
};

const NoBoards = () => <p>No Boards...</p>;
const NoLists = () => <p> No lists...</p>;

export default Board;
