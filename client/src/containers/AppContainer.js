// import React, { Component } from "react";
import App from "../components/App";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps, null)(App);
