import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const LoginForm = ({ onSubmit }) => {
	return (
		<div className="login-container">
			<Paper zDepth={2} style={{ padding: "20px" }}>
				<form onSubmit={onSubmit}>
					<TextField type="email" floatingLabelText="Email" />
					<br />
					<TextField type="password" floatingLabelText="Password" />
					<br />
					<br />
					<RaisedButton type="submit" label="Log In" primary={true} />
				</form>
			</Paper>
		</div>
	);
};

export default LoginForm;
