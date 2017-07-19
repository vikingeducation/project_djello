import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';

class LoginError extends Component {
  constructor() {
    super()
    this.state = {
      visible: true
    }
  }

  handleAlertDismiss = () => {
    this.setState({visible: false});
  }

  render() {
    if (this.state.visible) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          <h4>Whoops, something went wrong!</h4>
          <p>Please try logging in again.</p>
        </Alert>
      );
    } else {
      return null;
    }
  }
}

export default LoginError;