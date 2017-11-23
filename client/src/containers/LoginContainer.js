import React from "react";
import Input from "../components/elements/Input";
import InputGroup from "../components/elements/InputGroup";
import Button from "../components/elements/Button";
import serialize from "form-serialize";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCookie } from "../actions";

const LoginContainer = ({ setCookieInfo }) => {
  const submitLogIn = e => {
    e.preventDefault();
    const form = e.target;
    let data = serialize(form, { hash: true });

    if (data.username && data.password) {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        })
      })
        .then(status => {
          if (status.ok) {
            return status.json();
          } else {
            return { Error: "Error" };
          }
        })
        .then(json => {
          Cookies.set("key", json.data, { expires: 1 });
          setCookieInfo(json.data);
          form.reset();
        })
        .catch(err => console.log("err", err));
    }
  };
  return (
    <div className="container login">
      <div className="row">
        <div className="col">
          <h3>Login</h3>
          <form onSubmit={submitLogIn}>
            <InputGroup labelText="Username">
              <Input name="username" placeholder="Username" />
            </InputGroup>
            <InputGroup labelText="Password">
              <Input name="password" type="password" placeholder="Password" />
            </InputGroup>
            <Button type="submit" color="primary">
              Sign In
            </Button>{" "}
            <Link to="/signup">
              <Button color="success">Sign up</Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCookieInfo: cookie => {
      dispatch(setCookie(cookie));
    }
  };
};

export default connect(null, mapDispatchToProps)(LoginContainer);
