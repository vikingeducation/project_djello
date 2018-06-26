import React, { Component } from 'react';
import { connect } from 'react-redux'
import { cardUpdate, cardDelete } from './actions'
import CardModal from './CardModal'

class CardModalContainer extends Component {

	state = {
		card: this.props.card,
		modal: false,
		showTitle: false,
		showDescription: false,
	}

	componentWillReceiveProps(nextProps) {
  	if (nextProps.card !== this.state.card) {
   		this.setState({ card: nextProps.card,
    		showTitle: false,
			showDescription: false, });
  		}
	}

	handleUpdate = (e) => {
		e.preventDefault();
		this.props.cardUpdate(this.props.client, this.props.list, { ...this.state.card });
		this.setState({
			modal: false
		})
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

	handleEditDescription = (e) => {
		this.setState({
			showDescription: !this.state.showDescription
		})
	}

	handleDelete = (e) => {
		this.props.cardDelete(this.props.client, this.props.list, this.props.card)
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
				handleUpdate={this.handleUpdate}
				handleChange={this.handleChange}
				handleDelete={this.handleDelete}
				handleEditTitle={this.handleEditTitle}
				handleEditDescription={this.handleEditDescription}
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
})

export default connect(mapStateToProps, { cardUpdate, cardDelete })(CardModalContainer);