import React from "react";
//Form
import serialize from "form-serialize";
import Cookies from "js-cookie";
//Redux
import { connect } from "react-redux";
import { setCookie } from "../actions";
//Component
import SigninForm from "../components/SigninForm";

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
          if (!json.data.Error) {
            Cookies.set("key", json.data, { expires: 1 });
            setCookieInfo(json.data);
            form.reset();
          }
        })
        .catch(err => console.log("err", err));
    }
  };
  return (
    <SigninForm
      onSubmit={submitLogIn}
      title="Login"
      button1="Sign In"
      button2="Sign Up"
      linkTo="/signup"
    />
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
