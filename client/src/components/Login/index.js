import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import DjelloAppBar from '../DjelloAppBar';

import LoginInterface from './interface';

export default class Login extends Component {
	constructor(props) {
		super(props);

		if (!props.socket) {
			throw new Error('No socket supplied for login component');
		}
		this.socket = props.socket;

		this.state = {
			username: '',
			password: ''
		};
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onLoginAttempt = e => {
		e.preventDefault();
		this.props.login({
			socket: this.socket,
			username: this.state.username,
			password: this.state.password
		});
	};

	render() {
		if (this.props.user) return <Redirect to="/main" />;
		return (
			<div>
				<DjelloAppBar title="Djello - The project management toolkit for awesome people!" />
				<LoginInterface
					onInputChange={this.onChange}
					onSubmit={this.onLoginAttempt}
				/>
			</div>
		);
	}
}
