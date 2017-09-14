import React, { Component } from 'react';

import logo from './logo.svg';

import openSocket from 'socket.io-client';
import Events from '../../containers/App/actions';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SessionWrapper from '../SocketSessionWrapper';

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
		return (
			<Router>
				<SessionWrapper user={this.props.LoginReducer.user}>
					<Switch>
						<Route exact path="/" component={() => <p>foo</p>} />
						<Route render={() => <h1>Page not found</h1>} />
					</Switch>
				</SessionWrapper>
			</Router>
		);
	}

	componentWillUnmount() {
		this.socket.disconnect();
	}
}

export default App;
