import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { boardUpdate, boardDelete } from './actions';
import Board from './Board';

/**
  * @desc performs the initial data fetching for boards.
  * @params state - board of the current state.
  * @return board - presentational component.
*/

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
			showDescription: false, 
		});
  		}
	}

	handleUpdate = (e) => {
		e.preventDefault();
		this.props.boardUpdate(this.props.client, this.state.board);
	}

	handleDelete = (e) => {
		e.preventDefault();
		this.props.boardDelete(this.props.client, this.state.board);
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
						handleChange={this.handleChange}
						handleUpdate={this.handleUpdate}
						handleDelete={this.handleDelete}
						handleEditTitle={this.handleEditTitle} 
						handleEditDescription={this.handleEditDescription}
						showTitle={showTitle}
						showDescription={showDescription}
					/>  
		} else {
			return null
		}	
	}
}

BoardContainer.propTypes = {
	board: PropTypes.object,
	client: PropTypes.object,
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
