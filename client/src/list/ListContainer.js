import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import List from './List';
import ListCreate from './ListCreate'
import ListUpdate from './ListUpdate'
import ListDelete from './ListDelete'
import Messages from '../notifications/Messages'  
import Errors from '../notifications/Errors'

import { listSetCurrent } from './actions'

class ListContainer extends Component {

	handleClick = (list) => {
		this.props.listSetCurrent(list)
	}

	render() {

		const { list } = this.props;

		return (

			<div className="list">

				{ list ? <List handleClick={this.handleClick} list={list} /> : <p>no list found</p> } 
			</div>
			)
	}
}

const getList = (state, ownProps) => {
	return state.list.lists.byId[ownProps.listId];
}

const mapStateToProps = (state, ownProps) => ({
	list: getList(state, ownProps),
	client: state.client
})

const connected = connect(mapStateToProps, { listSetCurrent })(ListContainer);

export default connected;
