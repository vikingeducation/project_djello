import React, { Component } from 'react';
import { boardSetCurrent } from './actions';
import { connect } from 'react-redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class BoardSelect extends Component {

	constructor(props){
		super(props)
		this.state = {
			dropdownOpen: false,
		}
	};

	handleToggleDropdown = (e) => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
	}

	setCurrentBoard = (board) => {
		this.props.boardSetCurrent(board);
	}


	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.handleToggleDropdown}>
				<DropdownToggle caret>
					Board List
				</DropdownToggle>
				<DropdownMenu>
					{ this.props.boards.map(board => (
						<DropdownItem key={board._id} onClick={() => this.setCurrentBoard(board)}>{ board.title }</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		)
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

const connected = connect(mapStateToProps, { boardSetCurrent })(BoardSelect)  

export default connected;  