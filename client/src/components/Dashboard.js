import React, { Component } from "react";
import ListContainer from "../containers/ListContainer";

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			currentBoard: null
		};
	}

	componentDidMount() {
		this.setState({ currentBoard: 0 });
	}

	changeBoard = e => {
		this.setState({ currentBoard: e.target.value });
	};

	addOrDeleteBoard = async (type, id) => {
		await this.props[type](id);
		document.querySelector("#board-0").selected = true;
		this.setState({ currentBoard: 0 });
	};

	createList = async e => {
		e.preventDefault();
		await this.props.createList(
			this.props.boards[this.state.currentBoard].id,
			this.props.boards[this.state.currentBoard].Lists.length
		);
	};

	render() {
		return (
			<div>
				<h2>
					{this.state.currentBoard === null ? null : (
						this.props.boards[this.state.currentBoard].title
					)}
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
						this.addOrDeleteBoard(
							"deleteBoard",
							this.props.boards[this.state.currentBoard].id
						);
					}}
				>
					Delete Board
				</a>
				<div className="grid-container">
					{this.state.currentBoard === null ? null : (
						this.props.boards[this.state.currentBoard].Lists.map(list => (
							<ListContainer
								key={list.id}
								id={list.id}
								parentId={this.props.boards[this.state.currentBoard].id}
								title={list.title}
								cards={list.Cards}
								deleteList={id => {
									this.props.deleteList(id);
								}}
							/>
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
