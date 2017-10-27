import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from './actions';

import Login from '../../components/Login';
import './Login.css';

const mapStateToProps = state => state.LoginReducer;
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			login: Actions.login,
			clearLoginError: Actions.clearLoginError
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
