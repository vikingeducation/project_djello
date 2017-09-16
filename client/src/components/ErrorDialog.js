import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../containers/App/actions';

class ErrorDialog extends React.PureComponent {
	render() {
		console.log('ERROR DIALOG', this.props);
		const actions = [
			<FlatButton
				label="Okay"
				primary={true}
				onClick={this.props.clearLoginError}
			/>
		];

		return (
			<div>
				<Dialog
					actions={actions}
					modal={false}
					open={this.props.LoginReducer.error ? true : false}
				>
					{this.props.LoginReducer.error}
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	LoginReducer: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
	clearLoginError: () => {
		dispatch(Actions.clearLoginError());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDialog);
