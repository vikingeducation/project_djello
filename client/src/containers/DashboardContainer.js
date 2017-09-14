import React, { Component } from "react";
import Dashboard from "../components/Dashboard";

class DashboardContainer extends Component {
	constructor() {
		super();
		this.state = {
			boards: []
		};
	}
	componentDidMount = async () => {
		const boards = await this.getUserBoards(1);
		this.setState({ boards: boards });
	};

	getUserBoards = async id => {
		const response = await fetch(`/api/${id}/boards/`);
		return await response.json();
	};
	render() {
		return <pre>{JSON.stringify(this.state.boards, null, 2)}</pre>;
	}
}

export default DashboardContainer;
