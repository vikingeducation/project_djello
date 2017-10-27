import logo from './logo.svg';

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
import store from '../../store';

import ReactLoading from 'react-loading';
import SessionWrapper from '../SocketSessionWrapper';
import Login from '../../containers/Login';
import Main from '../../containers/Main';
import ErrorDialog from '../ErrorDialog';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Events from '../../socket/events';
import { successLogin, failureLogin } from '../../containers/Login/actions';

const { INTERNAL, CLIENT } = Events;
// muiTheme={getMuiTheme(darkBaseTheme)}
class App extends Component {
	constructor(props) {
		super(props);
		this.socket = openSocket('http://localhost:3001');

		// TODO: Create abstraction for generic internal errors
		this.socket.on(INTERNAL.ERROR_NO_DB, err => {
			console.error(err);
		});

		this.socket.on(CLIENT.SUCCESS_LOGIN, data => {
			localStorage.setItem('sessionId', data.sessionToken);
			//delete data.sessionToken; TODO: Maybe remove this comment?
			store.dispatch(successLogin(data));
		});

		this.socket.on(CLIENT.FAILURE_LOGIN, err =>
			store.dispatch(failureLogin(err))
		);
	}

	componentDidMount() {
		// Attempt auto-login if possible.
		this.props.defaultLogin({ socket: this.socket });
	}

	render() {
		if (this.props.isWorking) return <ReactLoading type="bars" color="#444" />;
		return (
			<Router>
				<MuiThemeProvider>
					<div>
						<Switch>
							<Route
								exact
								path="/login"
								render={() => <Login socket={this.socket} />}
							/>
							<SessionWrapper user={this.props.LoginReducer.user}>
								<Switch>
									<Route
										exact
										path="/main"
										render={() => <Main socket={this.socket} />}
									/>
									<Route render={() => <h1>Page not found</h1>} />
								</Switch>
							</SessionWrapper>
						</Switch>
						<ErrorDialog />
					</div>
				</MuiThemeProvider>
			</Router>
		);
	}

	componentWillUnmount() {
		this.socket.disconnect();
	}
}

export default App;
