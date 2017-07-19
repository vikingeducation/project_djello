import React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const BoardPicker = ({allBoards, onChangeSelectedBoard}) => {
  let boardOptions = [];
  if (allBoards && allBoards.length > 0) {
    boardOptions = allBoards.map(board => (
      <option key={board.id} value={board.id}>{board.title}</option>
    ));
  }
  return (
    <form>
      <FormGroup controlId="selectedBoard">
        <ControlLabel>Select a Board:</ControlLabel>
        <FormControl componentClass="select" name="selectedBoard" onChange={onChangeSelectedBoard}>
        {boardOptions} 
        </FormControl>
      </FormGroup>
    </form>
  );
};

export default BoardPicker;