import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { boardDelete } from './actions';


class BoardDelete extends Component {

	submitDelete = () => {
		this.props.boardDelete(this.props.client, this.props.board);
	}

	render() {

		const { handleSubmit, submit } = this.props;

		return (
				<div className="board-delete">
					<form onSubmit={handleSubmit(this.submitDelete)}>
						<button action="submit">Delete</button>
					</form>
				</div>
		)
	}
}

const getBoard = (state) => {
	return state.board.boards.byId[state.board.current];
}

const mapStateToProps = state => ({
	board: getBoard(state),
	client: state.client
})

const connected = connect(mapStateToProps, { boardDelete })(BoardDelete);
const formed = reduxForm({
	form: 'boardDelete',
})(connected)

export default formed;