import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

export default class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props;

    return (
      <button onClick={() => onLogoutClick()} className="btn btn-primary">
        Logout
      </button>
    );
  }
}
