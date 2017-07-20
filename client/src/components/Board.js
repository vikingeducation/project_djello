import React from "react";
import { Col, Row } from "react-bootstrap";
import EditableField from "./EditableField";

const Board = ({ board, onChangeBoardTitle }) => {
  return (
    <Col md={12}>
      <Row>
        <Col md={4}>
          <EditableField fieldName={"title"} onSubmit={onChangeBoardTitle}>
            <h3>{board.title}</h3>
          </EditableField>
        </Col>
      </Row>
    </Col>
  );
};

export default Board;
