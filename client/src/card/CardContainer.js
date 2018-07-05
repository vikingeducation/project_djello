import React, { Component } from 'react';
import { connect } from 'react-redux'
import { cardUpdate, cardDelete } from './actions'
import CardModal from './CardModal'
import shortid from 'shortid'
import moment from 'moment'

function diff(a, b) {
	return a.filter(i => {
		return b.indexOf(i) === -1
	})
}

class CardContainer extends Component {

	state = {
		card: this.props.card,
		modal: false,
		selectedMember: 'Select User',
		previousTitle: this.props.card ? this.props.card.title : '',
		previousDescription: this.props.card ? this.props.card.description : '',
		previousCompleted: this.props.card ? this.props.card.completed : '',
		previousMembers: this.props.card ? this.props.card.members : [],
		showTitle: false,
		showDescription: false,
	}

	componentWillReceiveProps(nextProps) {
  	if (nextProps.card !== this.state.card) {
	   		this.setState({ 
	   			card: nextProps.card,
	   			previousTitle: nextProps.card.title,
	   			previousDescription: nextProps.card.description,
	   			previousMembers: nextProps.card.members,
	   			previousCompleted: nextProps.card.completed,
	    		showTitle: false,
				showDescription: false 
			});
  		}
	}

	filterFriends = (friends, members) => {
		return friends.filter(friend => {
			return members.indexOf(friend) == -1 
		})
	}


	handleUpdate = (e) => {
		e.preventDefault();

		let log = [];

		if(this.state.card.title !== this.state.previousTitle)
			log = [...log, `title:${this.state.previousTitle},${this.state.card.title}`]

		if(this.state.card.description !== this.state.previousDescription)
			log = [...log, `description:${this.state.previousDescription},${this.state.card.description}`]

		if(this.state.card.completed !== this.state.previousCompleted)
			log = [...log, `completed:${this.state.previousCompleted},${this.state.card.completed}`]

		if(diff(this.state.previousMembers, this.state.card.members).length > 0)
			log = [...log, `removed:${diff(this.state.previousMembers, this.state.card.members)}`]

		if(diff(this.state.card.members, this.state.previousMembers).length > 0)
			log = [...log, `added:${diff(this.state.card.members, this.state.previousMembers)}`]

		if(log.length > 0){
			this.props.cardUpdate(this.props.client, this.props.list, {...this.state.card, activity: [...this.state.card.activity, {_id: shortid.generate(), user: this.props.client.user._id, timestamp: moment().format(), log: log }]});
		}

		this.setState({
			modal: false
		})
	}

	handleSelectedMember = (e) => {
		e.preventDefault();
		this.setState({
			selectedMember: e.target.value,
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
		this.setState({
			card: {
				...this.state.card,
				members: [...this.state.card.members, this.state.selectedMember]
			}
		})
	}

	handleDeleteMember = (selected) => {
	
		console.log(selected);
		let members = this.state.card.members.filter(member => {
			return member !== selected.toString();
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
		const { card, selectedMember } = this.state;

		if(card) {

		return (
			<CardModal 
				handleToggle={this.handleToggle}
				handleUpdate={this.handleUpdate}
				handleChange={this.handleChange}
				handleDelete={this.handleDelete}
				handleSelectedMember={this.handleSelectedMember}
				handleDeleteMember={this.handleDeleteMember}
				handleAddMember={this.handleAddMember}
				handleCompleted={this.handleCompleted}
				handleEditTitle={this.handleEditTitle}
				handleEditDescription={this.handleEditDescription}
				modal={this.state.modal}
				selected={selectedMember}
				showTitle={this.state.showTitle}
				showDescription={this.state.showDescription}
				card={this.state.card}
				list={list}
			/>
		);
		} else {
			return null
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

export default connect(mapStateToProps, { cardUpdate, cardDelete })(CardContainer);