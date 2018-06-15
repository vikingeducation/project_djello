import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { boardCreate } from './actions';


class BoardCreate extends Component {

	submitCreate = (values) => {

		console.log(this.props.client);

		this.props.boardCreate(this.props.client, { ...values, userId: this.props.client.user._id});
		this.props.reset()
	}

	render() {

		const { handleSubmit, invalid, submit } = this.props;

		return (
				<div className="board-form">
					<form onSubmit={handleSubmit(this.submitCreate)}>
						<h1>Create Board</h1>
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

const mapStateToProps = state => ({
	client: state.client
})

const connected = connect(mapStateToProps, { boardCreate })(BoardCreate);
const formed = reduxForm({
	form: 'boardCreate',
})(connected)

export default formed;