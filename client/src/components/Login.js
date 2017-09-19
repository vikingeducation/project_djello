import React from "react";

import { RaisedButton, TextField, Text } from "material-ui";
// import swal from "sweetalert2";

import { NavLink } from "react-router-dom";
import {
  Grid,
  Row,
  Col,
  getRowProps,
  getColumnProps
} from "react-flexbox-grid";

import { deepPurple400 } from "material-ui/styles/colors";

const Login = ({ onSubmitForm, error_email, error_password }) => {
  return (
    <Grid fluid>
      <Row>
        <Col lgOffset={4} lg={4}>
          <form onSubmit={onSubmitForm}>
            <br />
            <Col lg={12}>
              <TextField
                floatingLabelText="email"
                name="email"
                type="text"
                errorText={error_email}
              />
            </Col>
            <Col lg={12}>
              <TextField
                floatingLabelText="password"
                name="password"
                type="password"
                errorText={error_password}
              />
            </Col>
            <br />
            <br />
            <Col lg={4} lgOffset={3}>
              <RaisedButton label="Sign In" type="submit" primary={true} />
            </Col>
          </form>
          <br />
        </Col>
      </Row>
    </Grid>
  );
};

export default Login;
