// import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "../components/Dashboard";

// class DashboardContainer extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			boards: [],
// 			currentBoard: null
// 		};
// 	}
// 	componentDidMount = async () => {
// 		const boards = await this.getUserBoards(1);
// 		this.setState({ boards: boards, currentBoard: boards[0] });
// 	};

// 	getUserBoards = async id => {
// 		const response = await fetch(`/api/${this.props.user.id}/boards/`);
// 		return await response.json();
// 	};

// 	changeBoard = e => {
// 		this.setState({ currentBoard: this.state.boards[e.target.value] });
// 	};

// 	newBoard = e => {
// 		e.preventDefault();
// 	};

// 	deleteBoard = e => {
// 		e.preventDefault();
// 	};

// 	render() {
// 		return (
// 			<Dashboard
// 				boards={this.state.boards}
// 				currentBoard={this.state.currentBoard}
// 				onChange={this.changeBoard}
// 			/>
// 		);
// 	}
// }

const mapStateToProps = state => ({
	user: state.user,
	boards: state.boards
});

const mapDispatchToProps = dispatch => ({
	createBoard: userId => {
		dispatch(createBoard(userId));
	},
	deleteBoard: id => {
		dispatch(deleteBoard(id));
	}
});

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
	Dashboard
);

export default DashboardContainer;
