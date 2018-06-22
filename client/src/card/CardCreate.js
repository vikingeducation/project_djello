import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { cardCreate } from './actions';


class CardCreate extends Component {

	submitCreate = (values) => {

		this.props.cardCreate(this.props.client, this.props.list, { ...values, listId: this.props.list._id });
		this.props.reset()
	}

	render() {

		const { handleSubmit, invalid, submit } = this.props;

		return (
				<div className="card-form">
					<form onSubmit={handleSubmit(this.submitCreate)}>
						<h1>Create Card</h1>
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

const getList = (state, ownProps) => {
	return state.list.lists.byId[ownProps.listId]
}

const mapStateToProps = (state, ownProps) => ({
	client: state.client,
	list: getList(state, ownProps),
})

const connected = connect(mapStateToProps, { cardCreate })(CardCreate);
const formed = reduxForm({
	form: 'cardCreate',
})(connected)

export default formed;