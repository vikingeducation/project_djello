import React from "react";
//Form
import serialize from "form-serialize";
import Cookies from "js-cookie";
//Redux
import { connect } from "react-redux";
import { setCookie } from "../actions";
//Component
import { database } from "../actions/constents/database";
import SigninForm from "../components/SigninForm";

const SignupContainer = ({ setCookieInfo }) => {
  const submitNew = e => {
    e.preventDefault();
    const form = e.target;
    let data = serialize(form, { hash: true });

    if (data.username && data.password) {
      fetch(`${database}/signup`, {
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
      onSubmit={submitNew}
      title="Sign Up"
      button1="Create New User"
      button2="Log In"
      linkTo="/"
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

export default connect(null, mapDispatchToProps)(SignupContainer);
