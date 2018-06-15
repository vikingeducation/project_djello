import React, { Component } from 'react';
import List from './List';
import { connect } from 'react-redux';
import CardContainer from '../card/CardContainer';



class ListContainer extends Component {


	render() {

		const { list } = this.props;



		return (
			list ? 
			<List list={list}/> : <p>no list found</p>
			)
	}
}

const getList = (state, ownProps) => {
	return state.list.lists.byId[ownProps.listId];
}

const mapStateToProps = (state, ownProps) => ({
	list: getList(state, ownProps)
})

const connected = connect(mapStateToProps)(ListContainer);

export default connected;