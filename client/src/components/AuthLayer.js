import React from "react";
import Login from "./Login";
import { Grid, Row, Col } from "react-bootstrap";
import BoardPickerContainer from "../containers/BoardPickerContainer";
import BoardContainer from "../containers/BoardContainer";

const AuthLayer = ({
  isAuthenticated,
  loginUser,
  authError,
  token,
  userId,
  specificBoard,
  allBoards
}) => {
  if (!isAuthenticated) {
    return <Login loginUser={loginUser} error={authError} />;
  }
  
  if (allBoards.length === 0) {
    return (
      <Grid>
        <Row>
          <h1>Djello</h1>
          <Col md={10}>
            <h3>Uh oh, no boards could be found! Make your first one to get started!</h3>
          </Col>
          <Col md={2}>
            <BoardPickerContainer
              token={token}
              userId={userId}
              currentBoard={specificBoard}
            />
          </Col>
        </Row>
      </Grid>
    )
  }

  return (
    <Grid>
      <Row>
        <h1>Djello</h1>
        <Col md={10}>
          <BoardContainer
            token={token}
            boardId={specificBoard._id}
            userId={userId}
          />
        </Col>
        <Col md={2}>
          <BoardPickerContainer
            token={token}
            userId={userId}
            currentBoard={specificBoard}
          />
        </Col>
      </Row>
    </Grid>
  );
};

export default AuthLayer;
