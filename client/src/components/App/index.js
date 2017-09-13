import React, { Component } from 'react';

import logo from './logo.svg';

import openSocket from 'socket.io-client';
import Events from '../../containers/App/actions';

const { SYSTEM, CLIENT } = Events;
class App extends Component {
	constructor(props) {
		super(props);
		this.socket = openSocket('http://localhost:3001');

		// TODO: Abstract all of this stuff.
		this.socket.on(CLIENT.SUCCESS_LOGIN, data => {
			console.log('Login successful', data);
		});

		this.socket.on(CLIENT.FAILURE_LOGIN, data => {
			console.log('Login failed', data);
		});

		this.socket.emit(CLIENT.ATTEMPT_LOGIN, {
			username: 'foo',
			password: 'bar'
		});
	}

	render() {
		return <div />;
	}

	componentWillUnmount() {
		this.socket.disconnect();
	}
}

export default App;
