import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Actions from '../containers/App/actions';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ErrorDialog extends React.PureComponent {
	render() {
		const actions = [
			<FlatButton
				label="Okay"
				primary={true}
				onClick={this.props.clearLoginError}
			/>
		];
		return (
			<Dialog
				actions={actions}
				modal={false}
				open={this.props.error ? true : false}
			>
				{this.props.error}
			</Dialog>
		);
	}
}

const mapStateToProps = state => ({
	error: state.LoginReducer.error
});

const mapDispatchToProps = dispatch => ({
	clearLoginError: () => {
		dispatch(Actions.clearLoginError());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDialog);
