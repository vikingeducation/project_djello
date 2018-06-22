import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { listCreate } from './actions';


class ListCreate extends Component {

	submitCreate = (values) => {

		this.props.listCreate(this.props.client, { ...values, boardId: this.props.board._id });
		this.props.reset()
	}

	render() {

		const { handleSubmit, invalid, submit } = this.props;

		return (
				<div className="list-form">
					<form onSubmit={handleSubmit(this.submitCreate)}>
						<h1>Create List</h1>
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
						>CREATE</button>
					</form>
				</div>
		)
	}
}

const getBoard = (state) => {
	return state.board.boards.byId[state.board.current];
}

const mapStateToProps = state => ({
	client: state.client,
	board: getBoard(state),
})

const connected = connect(mapStateToProps, { listCreate })(ListCreate);
const formed = reduxForm({
	form: 'listCreate',
})(connected)

export default formed;