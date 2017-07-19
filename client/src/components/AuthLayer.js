import React from 'react';
import Login from './Login';
import {Grid, Row, Col} from 'react-bootstrap';
import BoardPickerContainer from '../containers/BoardPickerContainer';

const AuthLayer = ({isAuthenticated, loginUser, authError}) => {
  if (!isAuthenticated) {
    return <Login loginUser={loginUser} error={authError}/>
  }

  return (
    <Grid>
      <Row>
        <h1>Djello</h1>
        <BoardPickerContainer />
      </Row>
    </Grid>
  )
};

export default AuthLayer;