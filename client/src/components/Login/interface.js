import React from 'react';
import Paper from 'material-ui/Paper';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { cyan500, grey100 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/RaisedButton';
import RaisedButton from 'material-ui/RaisedButton';

import Divider from 'material-ui/Divider';

export default props => {
	return (
		<div className="pure-g login-interface">
			<div className="pure-u-1-4 offset-sm-1-3">
				<form onSubmit={props.onSubmit} style={{ marginLeft: '1em' }}>
					<Paper zDepth={5}>
						<Card>
							<CardHeader
								style={{ backgroundColor: cyan500 }}
								title="Djello Login"
								titleColor="#fff"
								subtitle="You must log in to continue"
								subtitleColor="#fff"
							/>
							<Divider />

							<CardTitle
								title="Enter your credentials below"
								subtitle="All inputs are required"
							/>
							<div className="pure-g login-interface-body">
								<div className="pure-u-1-8" />
								<div className="pure-u-3-4">
									<CardText>
										<div>
											<TextField
												fullWidth={true}
												autoComplete="false"
												name="username"
												hintText="Your username here..."
												floatingLabelText="Username"
												onChange={props.onInputChange}
											/>
										</div>
										<div>
											<TextField
												fullWidth={true}
												autoComplete="false"
												name="password"
												hintText="Your password here..."
												floatingLabelText="Password"
												onChange={props.onInputChange}
											/>
										</div>
									</CardText>
								</div>
								<div className="pure-u-1-8" />
							</div>
							<Divider />
							<CardActions style={{ backgroundColor: grey100 }}>
								<div className="pure-g">
									<div className="pure-u-3-4 offset-sm-1-8">
										<RaisedButton
											fullWidth={true}
											type="submit"
											label="Login"
											secondary={true}
										/>
									</div>
								</div>
							</CardActions>
						</Card>
					</Paper>
				</form>
			</div>
		</div>
	);
};
