import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import GroupWork from 'material-ui/svg-icons/action/group-work';

import Dialog from 'material-ui/Dialog';

import LoginInterface from './interface';
import ErrorDialog from '../ErrorDialog';

import './login-interface.css';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};
	}

	onLoginAttempt = e => {
		e.preventDefault();
		this.props.loginAction({
			socket: this.props.socket,
			username: this.state.username,
			password: this.state.password
		});
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		console.log(this.props);
		if (this.props.user) return <Redirect to="/main" />;
		return (
			<div>
				<AppBar
					title="Djello - The project management toolkit for awesome people!"
					iconElementLeft={
						<IconButton>
							<GroupWork />
						</IconButton>
					}
				/>
				<LoginInterface
					onSubmit={this.onLoginAttempt}
					onInputChange={this.onChange}
				/>
				<ErrorDialog />
			</div>
		);
	}
}
