
import { Redirect } from "react-router-dom";
import {withRouter} from "react-router"

import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

 class Login extends React.Component {
    handleClick(event) {

    const email = this.refs.email;
    const password = this.refs.password;
    const creds = {
      email: email.value.trim(),
      password: password.value.trim()
    };
    this.props.onLoginClick(creds);
  }
  render() {
      const { errorMessage } = this.props;
      if (localStorage.getItem("id_token")) {
        return <Redirect to="/" />;
      }
    
    return (
  <div>
        <input type='text' ref='email' className="form-control" placeholder='Email'/>
        <input type='password' ref='password' className="form-control"placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>
        {errorMessage && <p>{errorMessage}</p>}
    </div>
    );
  }
}



export default withRouter(Login)
