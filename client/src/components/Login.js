import React from 'react';
import {Grid, Row, Col, Panel, FormControl, Button} from 'react-bootstrap';

const Login = ({loginUser}) => {
  return (
    <Grid>
      <Row>
        <Col md={6} mdOffset={3}>
        <h1>Login</h1>
        <Panel header="Enter your email and password">
          <form onSubmit={loginUser}>
            <FormControl
              type="email"
              name="email"
              placeholder="Email"
            />
            <br />
            <FormControl
              type="password"
              name="password"
              placeholder="Password"
            />
            <br />
            <Button 
              type="submit"
              bsStyle="success"
            >
              Log In
            </Button>
          </form>
        </Panel>
        </Col>
      </Row>
    </Grid>
  )
};

export default Login;