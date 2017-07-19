import React from 'react';
import Login from './Login';
import {Grid, Row, Col} from 'react-bootstrap';
import BoardPickerContainer from '../containers/BoardPickerContainer';
import BoardContainer from '../containers/BoardContainer';

const AuthLayer = ({isAuthenticated, loginUser, authError, token, userId, specificBoard}) => {
  if (!isAuthenticated) {
    return <Login loginUser={loginUser} error={authError}/>
  }

  return (
    <Grid>
      <Row>
        <h1>Djello</h1>
        <Col md={4} mdOffset={8}>
          <BoardPickerContainer token={token}/>
        </Col>
      </Row>
      <Row>
        <BoardContainer 
          token={token}
          boardId={specificBoard._id}
          userId={userId}
        />
      </Row>
    </Grid>
  )
};

export default AuthLayer;