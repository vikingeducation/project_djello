import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { cardDelete } from './actions';


class CardDelete extends Component {

	submitDelete = () => {
		this.props.cardDelete(this.props.client, this.props.list, this.props.card);
	}

	render() {

		const { handleSubmit, submit } = this.props;

		return (
				<div className="card-delete">
					<form onSubmit={handleSubmit(this.submitDelete)}>
						<button action="submit">Delete</button>
					</form>
				</div>
		)
	}
}

const getCard = (state, ownProps) => {
	return state.card.cards.byId[ownProps.cardId]
}


const mapStateToProps = (state, ownProps) => ({
	client: state.client,
	card: getCard(state, ownProps),
})

const connected = connect(mapStateToProps, { cardDelete })(CardDelete);
const formed = reduxForm({
	form: 'cardDelete',
})(connected)

export default formed;