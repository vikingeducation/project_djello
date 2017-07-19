import React from 'react';
import {Col} from 'react-bootstrap';
import EditableField from './EditableField';

const Board = ({board}) => {
  return (
    <Col md={12}>
      <EditableField>
        <h3>{board.title}</h3>
      </EditableField>
    </Col>
  );
};

export default Board;