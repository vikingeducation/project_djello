import React, { Component } from 'react';
import { connect } from 'react-redux'

// import actions
import { dataRequest } from './actions';
import { setClient } from '../client/actions';
import { boardSetCurrent } from '../board/actions';

// import components
import { Container } from 'mdbreact';
import BoardSelect from '../board/BoardSelect'
import BoardCreate from '../board/BoardCreate'
import BoardContainer from '../board/BoardContainer'
import Navbar from '../navbar/Navbar'

class DashboardContainer extends Component {

	componentDidMount() {
		this.props.dataRequest({
			user: {
				_id: 'user1'
			}
		});
	}

	render() {

		const { boards } = this.props;

		if(boards) {
			return <div>
					<Navbar />
					<Container className="mt-3 pt-3">
						<div className="row justify-content-end">
							<BoardSelect />
							<BoardCreate />
						</div>
						<BoardContainer />
					</Container>
					</div>
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
