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
		this.props.cardUpdate(this.props.client, this.props.list, this.state.card);
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

	handleAddMember = (e) => {
		let toAdd = e.target.value;
		this.setState({
			card: {
				...this.state.card,
				members: [...this.state.card.members, toAdd]
			}
		})
	}

	handleDeleteMember = (e) => {
		let toDelete = e.target.value;
		let members = this.state.card.members.filter(member => {
			return member !== toDelete;
		})

		this.setState({
			card: {
				...this.state.card,
				members: members
			}
		})
	}

	handleEditTitle = (e) => {
		this.setState({
			showTitle: !this.state.showTitle
		})
	}

	handleCompleted = (e) => {

		this.setState({
			card: {
				...this.state.card,
				completed: !this.state.card.completed
			}
		})
	}

	handleEditDescription = (e) => {
		this.setState({
			showDescription: !this.state.showDescription
		})
	}

	handleDelete = (e) => {
		this.props.cardDelete(this.props.client, this.props.list, this.state.card)
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

		const { list } = this.props;
		const { card } = this.state;

		if(card) {

		return (
			<CardModal 
				handleToggle={this.handleToggle}
				handleUpdate={this.handleUpdate}
				handleChange={this.handleChange}
				handleDelete={this.handleDelete}
				handleCompleted={this.handleCompleted}
				handleEditTitle={this.handleEditTitle}
				handleEditDescription={this.handleEditDescription}
				modal={this.state.modal}
				showTitle={this.state.showTitle}
				showDescription={this.state.showDescription}
				card={this.state.card}
				list={list}
			/>
		);
		} else {
			return <p></p>
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