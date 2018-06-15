import React, { Component } from 'react'
import Card from './Card';
import { connect } from 'react-redux'

class CardContainer extends Component {

	render() {

		const { card } = this.props;

		return (
			card ? 
			<Card card={card} /> : <p>no card</p>
			)

	}
}

const getCard = (state, ownProps) => {
	return state.card.cards.byId[ownProps.cardId];
}

const mapStateToProps = (state, ownProps) => ({
	card: getCard(state, ownProps)
})

const connected = connect(mapStateToProps)(CardContainer);

export default connected;