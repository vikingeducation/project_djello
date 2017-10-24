import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login'
import serialize from 'form-serialize'
import { login, loginFormErrors } from '../actions/authActions'
import AppContainer from './AppContainer'


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn && state.auth.token,
    feedback: state.auth.feedback,
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (form) => {
      dispatch(login(form))
    }
  }
}

const Authenticator = (props) => {
  const { isLoggedIn, ...rest } = props
  return (isLoggedIn ?
    <div><AppContainer /></div> :
    <Login {...rest} />
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(Authenticator)