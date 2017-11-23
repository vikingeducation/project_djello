import React from "react";
import Input from "../components/elements/Input";
import InputGroup from "../components/elements/InputGroup";
import Button from "../components/elements/Button";
import serialize from "form-serialize";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCookie } from "../actions";

const SignupContainer = ({ setCookieInfo }) => {
  const submitNew = e => {
    e.preventDefault();
    const form = e.target;
    let data = serialize(form, { hash: true });

    if (data.username && data.password) {
      fetch("/signup", {
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
            return "errr";
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
          <h3>Sign Up</h3>
          <form onSubmit={submitNew}>
            <InputGroup labelText="New Username">
              <Input name="username" placeholder="New Username" />
            </InputGroup>
            <InputGroup labelText="New Password">
              <Input
                name="password"
                type="password"
                placeholder="New Password"
              />
            </InputGroup>
            <Button type="submit" color="primary">
              Create New User
            </Button>{" "}
            <Link to="/">
              <Button color="success">Log In</Button>
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

export default connect(null, mapDispatchToProps)(SignupContainer);
