import React from 'react';
import {Col} from 'react-bootstrap';

const Board = ({board}) => {
  return (
    <Col md={12}>
      <h3>{board.title}</h3>
    </Col>
  );
};

export default Board;