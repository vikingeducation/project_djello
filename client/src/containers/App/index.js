import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { defaultLogin } from '../Login/actions';

import App from '../../components/App';
import './App.css';

const mapStateToProps = state => ({
	isWorking: state.LoginReducer.isWorking,
	error: state.LoginReducer.error,
	...state
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			defaultLogin
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(App);
