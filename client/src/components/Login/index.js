import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { pink500, green600 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/RaisedButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import 'material-design-icons/iconfont/material-icons.css';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};
	}

	render() {
		if (this.props.user) return <Redirect to="/main" />;
		return (
			<Card>
				<CardHeader
					title="Stylish Form"
					subtitle="An awesome material-ui form!"
				/>
				<CardTitle
					title="Complete the form"
					subtitle="Everything must be valid... OR ELSE!"
				/>
				<CardText>
					<form onSubmit={this.props.submit} style={{ marginLeft: '1em' }}>
						<div>
							<TextField
								autoComplete="false"
								name="name"
								hintText="Your name here..."
								floatingLabelText="Name"
								onChange={this.props.change}
							/>
						</div>
						<div>
							<TextField
								autoComplete="false"
								name="email"
								hintText="Your email here..."
								floatingLabelText="Email"
								onChange={this.props.change}
							/>
						</div>
						<div>
							<TextField
								autoComplete="false"
								name="phone"
								hintText="Your Phone here..."
								floatingLabelText="Phone"
								onChange={this.props.change}
							/>
						</div>
						<br />
						<CardActions>
							<RaisedButton type="submit" label="Submit" secondary={true} />
						</CardActions>
					</form>
				</CardText>
			</Card>
		);
	}
}
