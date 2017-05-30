import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import React from "react";

import { Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  handleClick = event => {
    const email = this.refs.email;
    const password = this.refs.password;
    const creds = {
      email: email.value.trim(),
      password: password.value.trim()
    };
    this.props.onLoginClick(creds);
  };
  render() {
    const { errorMessage, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Row>
          <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>
            <input
              type="text"
              ref="email"
              className="form-control"
              placeholder="Email"
              style={{ margin: "10px" }}
            />
            <input
              type="password"
              ref="password"
              className="form-control"
              placeholder="Password"
              style={{ margin: "10px" }}
            />
            <button
              onClick={this.handleClick}
              className="btn btn-primary"
              style={{ margin: "30px" }}
            >
              Login
            </button>
            {errorMessage && <p>{errorMessage}</p>}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);
