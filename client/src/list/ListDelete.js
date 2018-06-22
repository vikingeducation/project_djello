import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { listDelete } from './actions';


class ListDelete extends Component {

	submitDelete = () => {
		this.props.listDelete(this.props.client, this.props.list);
	}

	render() {

		const { handleSubmit, submit } = this.props;

		return (
				<div className="list-delete">
					<form onSubmit={handleSubmit(this.submitDelete)}>
						<button action="submit">Delete</button>
					</form>
				</div>
		)
	}
}

const mapStateToProps = state => ({
	client: state.client
})

const connected = connect(mapStateToProps, { listDelete })(ListDelete);
const formed = reduxForm({
	form: 'listCreate',
})(connected)

export default formed;