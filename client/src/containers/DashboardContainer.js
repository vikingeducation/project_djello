import React, { Component } from "react";
import Dashboard from "../components/Dashboard";

class DashboardContainer extends Component {
	constructor() {
		super();
		this.state = {
			boards: [],
			currentBoard: null
		};
	}
	componentDidMount = async () => {
		const boards = await this.getUserBoards(1);
		this.setState({ boards: boards, currentBoard: boards[0] });
	};

	getUserBoards = async id => {
		const response = await fetch(`/api/${this.props.user.id}/boards/`);
		return await response.json();
	};

	changeBoard = e => {
		this.setState({ currentBoard: this.state.boards[e.target.value] });
	};
	render() {
		return (
			<Dashboard
				boards={this.state.boards}
				currentBoard={this.state.currentBoard}
				onChange={this.changeBoard}
			/>
		);
	}
}

export default DashboardContainer;
