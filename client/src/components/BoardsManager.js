import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import CreateBoardContainer from "../containers/CreateBoardContainer";
import DeleteBoardButton from "./DeleteBoardButton";

const dropBoards = (boards, changeCurrentBoard, currentBoard) => {
  return boards.filter(board => board.name !== currentBoard.name).map(board => {
    return (
      <DropdownItem
        onClick={changeCurrentBoard(boards)}
        value={board.name}
        key={board.id}
      >
        {board.name}
      </DropdownItem>
    );
  });
};

const BoardsManager = ({
  boards,
  currentBoard,
  changeCurrentBoard,
  isOpen,
  toggle,
  deleteBoard
}) => {
  return (
    <div style={{ display: "inline-block", marginTop: "10px" }}>

      {boards && boards.length
        ? <ButtonDropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle caret>
              {currentBoard.name}
            </DropdownToggle>
            <DropdownMenu>
              {dropBoards(boards, changeCurrentBoard, currentBoard)}
            </DropdownMenu>
          </ButtonDropdown>
        : null}
      <CreateBoardContainer />
      {boards && boards.length
        ? <DeleteBoardButton onClick={deleteBoard(currentBoard.id)} />
        : null}

    </div>
  );
};

export default BoardsManager;
