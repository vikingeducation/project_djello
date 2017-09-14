import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

export default class SocketSessionWrapper extends PureComponent {
	render() {
		if (!this.props.user) {
			return <Redirect to="/login" />;
		}
		return this.props.children;
	}
}
