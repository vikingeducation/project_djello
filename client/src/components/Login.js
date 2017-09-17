import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Loader,
  Message,
  Segment
} from "semantic-ui-react";

import Showable from "../components/elements/Showable";

const Login = ({ username, password, loading, message, actions }) => (
  <Grid textAlign="center" verticalAlign="middle">
    <Grid.Column width={16}>
      <Showable condition={!!message}>
        <Message color="blue">{message}</Message>
      </Showable>
    </Grid.Column>
    <Grid.Column width={6}>
      <Loader active={loading} />
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
            onChange={actions.onChange}
          />
          <Form.Input
            name="password"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            value={password}
            onChange={actions.onChange}
          />

          <Button onClick={actions.onLogIn} color="blue" size="large">
            Log In
          </Button>
          <Button onClick={actions.onSignUp} color="violet" size="large">
            Sign Up
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default Login;
