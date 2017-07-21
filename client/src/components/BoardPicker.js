import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const BoardPicker = ({
  allBoards,
  selectedBoard,
  onChangeSelectedBoard,
  onCreateBoard,
  onDeleteBoard
}) => {
  let boardOptions = [];
  if (allBoards && allBoards.length > 0) {
    boardOptions = allBoards.map(board =>
      <option key={board.id} value={board.id}>{board.title}</option>
    );
  }
  return (
    <form>
      <FormGroup controlId="selectedBoard">
        <ControlLabel>Select a Board:</ControlLabel>
        <FormControl
          componentClass="select"
          name="selectedBoard"
          onChange={onChangeSelectedBoard}
        >
          {boardOptions}
        </FormControl>
        <a onClick={onCreateBoard}>Add a Board</a>
        <br />
        <a onClick={onDeleteBoard}>Delete Current Board</a>
      </FormGroup>
    </form>
  );
};

export default BoardPicker;
