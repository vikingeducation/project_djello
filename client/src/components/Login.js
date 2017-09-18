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

// const style = {
//   color: "#9E9E9E",
//   fontSize: "16px",
//   fontWeight: "normal",
//   textAlign: "center"
// };

const Login = ({ onSubmitForm }) => {
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
                value="susan0@gmail.com"
              />
            </Col>
            <Col lg={12}>
              <TextField
                floatingLabelText="password"
                name="password"
                type="password"
                value="password"
              />
            </Col>
            <br />
            <br />
            <Col lg={4} lgOffset={3}>
              <RaisedButton label="Sign In" type="submit" primary={true} />
            </Col>
          </form>
        </Col>
      </Row>
    </Grid>
  );
};

export default Login;
