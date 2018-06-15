import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Board from './Board';
import BoardCreate from './BoardCreate'
import BoardUpdate from './BoardUpdate'
import BoardDelete from './BoardDelete'
import Messages from '../notifications/Messages'  
import Errors from '../notifications/Errors'

import { boardCreate } from './actions';


class BoardContainer extends Component {


	render() {

		const { board, handleSubmit, invalid, submit } = this.props;

		return (

			<div className="board">

				<BoardCreate />
				<BoardUpdate />
				<BoardDelete />

				{ board ? <Board board={board} /> : <p>no board found</p> } 
			</div>
			)
	}
}

const getBoard = (state) => {
	return state.board.boards.byId[state.board.current];
}

const mapStateToProps = state => ({
	board: getBoard(state),
	client: state.client
})

const connected = connect(mapStateToProps, { boardCreate })(BoardContainer);

export default connected;
