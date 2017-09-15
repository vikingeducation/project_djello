import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import openSocket from 'socket.io-client';

import SessionWrapper from '../SocketSessionWrapper';
import LoginInterface from '../Login';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from './logo.svg';

class App extends Component {
	constructor(props) {
		super(props);
		this.socket = openSocket('http://localhost:3001');

		// props.actions.login({
		// 	socket: this.socket,
		// 	username: 'user1',
		// 	password: 'foo'
		// });
	}

	render() {
		console.log(this.props);
		return (
			<Router>
				<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<Switch>
						<Route
							exact
							path="/login"
							render={() =>
								<LoginInterface user={this.props.LoginReducer.user} />}
						/>
						<SessionWrapper user={this.props.LoginReducer.user}>
							<Switch>
								<Route exact path="/main" render={() => <p>foo</p>} />
								<Route render={() => <h1>Page not found</h1>} />
							</Switch>
						</SessionWrapper>
					</Switch>
				</MuiThemeProvider>
			</Router>
		);
	}

	componentWillUnmount() {
		this.socket.disconnect();
	}
}

export default App;
