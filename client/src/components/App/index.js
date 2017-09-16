import logo from './logo.svg';

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import openSocket from 'socket.io-client';

import SessionWrapper from '../SocketSessionWrapper';
import Login from '../Login';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Events from '../../socket/events';

const { INTERNAL } = Events;
// muiTheme={getMuiTheme(darkBaseTheme)}
class App extends Component {
	constructor(props) {
		super(props);
		this.socket = openSocket('http://localhost:3001');

		// TODO: Create abstraction for generic internal errors
		this.socket.on(INTERNAL.ERROR_NO_DB, err => {
			console.error(err);
		});

		// props.actions.login({
		// 	socket: this.socket,
		// 	username: 'user1',
		// 	password: 'foo'
		// });
	}

	render() {
		console.log('APP PROPS', this.props);
		return (
			<Router>
				<MuiThemeProvider>
					<Switch>
						<Route
							exact
							path="/login"
							render={() =>
								<Login
									socket={this.socket}
									loginAction={this.props.actions.login}
									user={this.props.LoginReducer.user}
									error={this.props.LoginReducer.error}
									handleDialogClose={this.props.actions.clearLoginError}
								/>}
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
