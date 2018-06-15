import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { boardUpdate } from './actions';

class BoardUpdate extends Component {

	submitUpdate = (values) => {

		this.props.boardUpdate(this.props.client, {	...this.props.board, ...values });
		this.props.reset()
	}

	render() {

		const { handleSubmit, invalid, submit } = this.props;

		return (
				<div className="board-form">
					<form onSubmit={handleSubmit(this.submitUpdate)}>
						<h1>Update Board</h1>
						<label htmlFor="title">Title</label>

						<Field
							name="title"
							type="text"
							id="title"
							className="title"
							component="input"
						/>
						<label htmlFor="description">Description</label>
						<Field
							name="description"
							type="text"
							id="description"
							className="description"
							component="input"
						/>
						<button
							disabled={invalid}
							action="submit"
						>Update</button>
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

const connected = connect(mapStateToProps, { boardUpdate })(BoardUpdate)

const formed = reduxForm({
	form: 'boardUpdate',
})(connected)

export default formed;