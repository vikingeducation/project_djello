import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

const Login = ({ username, password, onLogIn, onSignUp, onChange }) => (
  <Grid textAlign="center" verticalAlign="middle">
    <Grid.Column width={6}>
      <Header as="h2" textAlign="center">
        Please Log In
      </Header>
      <Form size="large">
        <Segment>
          <Form.Input
            name="username"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Username"
            value={username}
            onChange={onChange}
          />
          <Form.Input
            name="password"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            value={password}
            onChange={onChange}
          />

          <Button onClick={onLogIn} color="blue" size="large">
            Log In
          </Button>
          <Button onClick={onSignUp} color="violet" size="large">
            Sign Up
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default Login;
