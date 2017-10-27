import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Actions from '../containers/App/actions';

import ReactLoading from 'react-loading';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class BoardSelection extends PureComponent {
	onChangeBoard = (e, idx, value) => {
		this.props.changeSelectedBoard(this.props.boardList[idx]);
	};

	render() {
		if (!this.props.boardList.length)
			return <ReactLoading type="bars" color="#444" />;
		return (
			<div className="pure-g">
				<div className="pure-u-1-2 offset-sm-1-4">
					<SelectField
						fullWidth={true}
						value={this.props.currentBoard._id}
						onChange={this.onChangeBoard}
					>
						{this.props.boardList.map((board, idx) =>
							<MenuItem
								key={board.name}
								value={board._id}
								primaryText={board.name}
							/>
						)}
					</SelectField>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	boardList: state.MainReducer.boardList,
	currentBoard: state.MainReducer.currentBoard
});

const mapDispatchToProps = dispatch => ({
	changeSelectedBoard: board => {
		dispatch(Actions.changeSelectedBoard(board));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardSelection);
