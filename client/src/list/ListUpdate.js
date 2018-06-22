import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { listUpdate } from './actions';

class ListUpdate extends Component {

	submitUpdate = (values) => {

		this.props.listUpdate(this.props.client, {	...this.props.list, ...values });
		this.props.reset()
	}

	render() {

		const { handleSubmit, invalid, submit } = this.props;

		return (
				<div className="list-form">
					<form onSubmit={handleSubmit(this.submitUpdate)}>
						<h1>Update List</h1>
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

const getList = (state, ownProps) => {
	return state.list.lists.byId[ownProps.list._id];
}

const mapStateToProps = (state, ownProps) => ({
	list: getList(state, ownProps),
	client: state.client
})

const connected = connect(mapStateToProps, { listUpdate })(ListUpdate)

const formed = reduxForm({
	form: 'listUpdate',
})(connected)

export default formed;