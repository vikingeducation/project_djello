import React, { Component } from 'react';
import { connect } from 'react-redux'
import { cardUpdate } from './actions'
import CardModal from './CardModal'

class CardModalContainer extends Component {

	state = {
		card: this.props.card,
		modal: false,
		showTitle: false,
		showDescription: false,
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.cardUpdate(this.props.client, this.props.list, { ...this.state.card });

	}

	handleToggle = (e) => {
		this.setState({
			...this.state,
			showTitle: false,
			showDescription: false,
			card: this.props.card,
			modal: !this.state.modal
		});
	}

	handleEditTitle = (e) => {
		this.setState({
			showTitle: !this.state.showTitle
		})
	}


	handleChange = (e) => {
		this.setState({
			card: {
				...this.state.card,
				[e.target.name]: e.target.value
			}
		})
	}

	render() {

		const { handleSubmit, invalid, submit, card, list } = this.props;

		if(this.state.card) {

		return (
			<CardModal 
				handleToggle={this.handleToggle}
				handleSubmit={this.handleSubmit}
				handleChange={this.handleChange}
				handleEditTitle={this.handleEditTitle}
				modal={this.state.modal}
				showTitle={this.state.showTitle}
				showDescription={this.state.showDescription}
				card={this.state.card}
				list={list}
				invalid={invalid}
			/>
		);
		}
	}
}


const getList = (state, ownProps) => {
	return state.list.lists.byId[ownProps.listId]
}

const getCard = (state, ownProps) => {
	return state.card.cards.byId[ownProps.cardId]
}

const mapStateToProps = (state, ownProps) => ({
	card: getCard(state, ownProps),
	list: getList(state, ownProps),
	client: state.client,
	initialValues: getCard(state, ownProps),
})

export default connect(mapStateToProps, { cardUpdate })(CardModalContainer);