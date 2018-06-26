import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from './Board';


import { boardUpdate, boardDelete } from './actions'

import Messages from '../notifications/Messages'  
import Errors from '../notifications/Errors'


class BoardContainer extends Component {

	state = {
		board: this.props.board,
		showTitle: false,
		showDescription: false,
	}

	componentWillReceiveProps(nextProps) {
  	if (nextProps.board !== this.state.board) {
   		this.setState({ board: nextProps.board,
    		showTitle: false,
			showDescription: false, });
  		}
	}

	handleUpdate = (e) => {
		e.preventDefault();
		this.props.boardUpdate(this.props.client, this.state.board);
	}

	handleDelete = (e) => {
		e.preventDefault();
		this.props.boardDelete(this.props.client, this.props.board);
	}

	handleChange = (e) => {
		this.setState({
			board: {
				...this.state.board,
				[e.target.name]: e.target.value
			}
		})
	}

	handleEditTitle = (e) => {
		this.setState({
			showTitle: !this.state.showTitle
		})
	}

	handleEditDescription= (e) => {
		this.setState({
			showDescription: !this.state.showDescription
		})
	}


	render() {
		const {  board, showTitle, showDescription } = this.state

		if(board) {
			return <Board 
						board={board} 
						handleEditTitle={this.handleEditTitle} 
						handleEditDescription={this.handleEditDescription}
						handleUpdate={this.handleUpdate}
						handleChange={this.handleChange}
						showTitle={showTitle}
						showDescription={showDescription}
					/>  
		} else {
			return <h1>No Board Found!</h1>
		}	
	}
}

const getBoard = (state) => {
	return state.board.boards.byId[state.board.current];
}

const mapStateToProps = state => ({
	board: getBoard(state),
	client: state.client
})

const connected = connect(mapStateToProps, { boardUpdate, boardDelete })(BoardContainer);

export default connected;
