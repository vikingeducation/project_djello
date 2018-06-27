import React, { Component } from 'react';
import { connect } from 'react-redux'
import { dataRequest } from './actions';
import { setClient } from '../client/actions';
import { boardSetCurrent } from '../board/actions';
import BoardSelect from '../board/BoardSelect'
import BoardCreate from '../board/BoardCreate'
import BoardContainer from '../board/BoardContainer'


import { Container } from 'mdbreact';

class DashboardContainer extends Component {

	componentDidMount() {
		this.props.dataRequest({
			user: {
				_id: 'HyFxJ4eW7'
			}
		});
	}

	render() {

		const { boards } = this.props;

		if(boards) {
			return <Container>
						<BoardSelect />
						<BoardCreate />
						<BoardContainer />
					</Container>
		} else {
			return <h1>No Boards Found!</h1>
		}
	}
}

const getBoards = (state) => {
	return state.board.boards.allIds.map(id => {
		return state.board.boards.byId[id];
	})
}

const mapStateToProps = state => ({  
	client: state.client,
	boards: getBoards(state)
})

const connected = connect(mapStateToProps, { dataRequest, setClient, boardSetCurrent })(DashboardContainer)  

export default connected;  
