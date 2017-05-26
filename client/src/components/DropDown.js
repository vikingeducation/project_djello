import React from "react";
import { connect } from "react-redux";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import CreateBoardContainer from "../containers/CreateBoardContainer";

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

const DropDown = ({
  boards,
  currentBoard,
  changeCurrentBoard,
  isOpen,
  toggle
}) => {
  return (
    <div style={{ display: "inline-block" }}>

      {Object.keys(boards).length
        ? <ButtonDropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle caret>
              {currentBoard.name}
            </DropdownToggle>
            <DropdownMenu>
              {dropBoards(boards.boards, changeCurrentBoard, currentBoard)}
            </DropdownMenu>
          </ButtonDropdown>
        : null}
      <CreateBoardContainer />
    </div>
  );
};

export default DropDown;
