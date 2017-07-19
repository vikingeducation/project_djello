import React from 'react';
import Login from './Login';
import {Grid, Row, Col} from 'react-bootstrap';
import BoardPickerContainer from '../containers/BoardPickerContainer';

const AuthLayer = ({isAuthenticated, loginUser, authError, token, specificBoard}) => {
  if (!isAuthenticated) {
    return <Login loginUser={loginUser} error={authError}/>
  }

  return (
    <Grid>
      <Row>
        <h1>Djello</h1>
        <h3>{specificBoard ? specificBoard.title : ""}</h3>
        <Col md={4} mdOffset={8}>
          <BoardPickerContainer token={token}/>
        </Col>
      </Row>
    </Grid>
  )
};

export default AuthLayer;