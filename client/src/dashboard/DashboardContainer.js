import React, { Component } from 'react';
import { connect } from 'react-redux'
import { dataRequest } from './actions';
import { setClient } from '../client/actions';
import { boardSetCurrent } from '../board/actions';
import CustomDropdown from './Dropdown';
import CreateModal from './CreateModal';
import { Container } from 'mdbreact';
import BoardContainer from '../board/BoardContainer'

class DashboardContainer extends Component {

	constructor(props){
		super(props)
		this.state = {
			dropdownOpen: false,
		}
	};

	componentDidMount() {
		this.props.dataRequest({
			user: {
				_id: 'HyFxJ4eW7'
			}
		});
	}

	handleToggleDropdown = (e) => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
	}

	setCurrentBoard = (board) => {
		this.props.boardSetCurrent(board);
	}
	render() {

		const { boards } = this.props;

		if(boards) {
			return <Container>
						<div className="row justify-content-end">
							<CustomDropdown 
								boards={boards}
								handleToggleDropdown={this.handleToggleDropdown}
								setCurrentBoard={this.setCurrentBoard}
								dropdownOpen={this.state.dropdownOpen}
							/>
							<CreateModal/>
						</div>
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
