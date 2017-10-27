import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Actions from '../containers/App/actions';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import GroupWork from 'material-ui/svg-icons/action/group-work';
// import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';

const UserActions = ({ user, logout }) => {
	return (
		<div>
			<FlatButton
				key="LogoutButton"
				primary={true}
				style={{
					marginTop: '.50em'
				}}
				label="Logout"
				labelStyle={{ color: '#fff' }}
				onClick={logout}
			/>
		</div>
	);
};

class DjelloAppBar extends PureComponent {
	render() {
		const items = [];
		return (
			<AppBar
				title={this.props.title}
				iconElementLeft={
					<IconButton>
						<GroupWork />
					</IconButton>
				}
				iconElementRight={
					this.props.user
						? <UserActions user={this.props.user} logout={this.props.logout} />
						: null
				}
			/>
		);
	}
}

const mapStateToProps = state => ({
	user: state.LoginReducer.user
});

const mapDispatchToProps = dispatch => ({
	logout: () => {
		dispatch(Actions.logout());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DjelloAppBar);
