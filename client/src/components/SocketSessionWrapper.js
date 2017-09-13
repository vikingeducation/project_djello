import React, { Component } from 'react';

class SocketSessionWrapper extends Component {
	constructor(props) {
		super(props);

		this.socket = props.socket;
	}

	reconnect() {}

	render() {
		if (this.socket.disconnected) {
		}
		return props.children;
	}
}
