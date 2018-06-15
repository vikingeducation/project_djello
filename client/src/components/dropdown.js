import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardSetCurrent } from '../board/actions';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class CustomDropdown extends Component {

	constructor(props){
		super(props)
		this.state = {
			boards: [],
			dropdownOpen: false
		}
	};
	
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.boards !== this.props.boards) {

			const updated = this.props.boards.allIds.map(id => {
				return this.props.boards.byId[id];
			});
			this.setState({
				boards: updated
			})
		}
	};

	toggle = (e) => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	setCurrentBoard = (board) => {
		this.props.boardSetCurrent(board._id);
	}


	render() {

		const { boards } = this.state;

		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle>
					Boards
				</DropdownToggle>
					<DropdownMenu>
					{ boards.map(board => (
						<DropdownItem key={board._id} onClick={() => this.setCurrentBoard(board)}>{ board.title }</DropdownItem>
						))
					}
					</DropdownMenu>
				</Dropdown>
			)
	}
}

const mapStateToProps = state => ({
	boards: state.board.boards
})

const connected = connect(mapStateToProps, { boardSetCurrent })(CustomDropdown)  

export default connected;