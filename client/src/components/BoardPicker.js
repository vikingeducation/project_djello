import React from 'react';
import {FormControl} from 'react-bootstrap';



const BoardPicker = ({allBoards, onChangeSelectedBoard}) => {
  let boardOptions = [];
  if (allBoards && allBoards.length > 0) {
    boardOptions = allBoards.map(board => (
      <option key={board.id} value={board.id}>{board.title}</option>
    ));
  }
  return (
    <form>
      <FormControl componentClass="select" name="selectedBoard"  onChange={onChangeSelectedBoard}>
       {boardOptions} 
      </FormControl>
    </form>
  );
};

export default BoardPicker;