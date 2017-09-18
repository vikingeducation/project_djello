import React, { Component } from "react";
import List from "./List";

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			currentBoard: null
		};
	}

	componentDidMount() {
		console.log("Props: ", this.props.user);
		this.setState({ currentBoard: this.props.boards[0] });
	}

	changeBoard = e => {
		this.setState({ currentBoard: this.props.boards[e.target.value] });
	};

	addOrDeleteBoard = async (type, id) => {
		await this.props[type](id);
		document.querySelector("#board-0").selected = true;
		console.log(this.props.boards);
		this.setState({ currentBoard: this.props.boards[0] });
	};

	createList = e => {
		e.preventDefault();
		this.props.createList(
			this.state.currentBoard.id,
			this.state.currentBoard.Lists.length
		);
	};

	render() {
		return (
			<div>
				<h2>
					{this.state.currentBoard ? this.state.currentBoard.title : null}
				</h2>

				<select id="boardSelector" onChange={this.changeBoard}>
					{!this.props.boards ? null : (
						this.props.boards.map((board, i) => (
							<option key={i} id={`board-${i}`} value={i}>
								{board.title}
							</option>
						))
					)}
				</select>
				<a
					href=""
					onClick={e => {
						e.preventDefault();
						this.addOrDeleteBoard("createBoard", this.props.user.id);
					}}
				>
					Add a board
				</a>
				<a
					href=""
					onClick={e => {
						e.preventDefault();
						this.addOrDeleteBoard("deleteBoard", this.state.currentBoard.id);
					}}
				>
					Delete Board
				</a>
				<div className="grid-container">
					{!this.state.currentBoard ? null : (
						this.state.currentBoard.Lists.map(list => (
							<List key={list.id} title={list.title} cards={list.Cards} />
						))
					)}
					<a href="" onClick={this.createList}>
						Add a List
					</a>
				</div>
			</div>
		);
	}
}

export default Dashboard;
