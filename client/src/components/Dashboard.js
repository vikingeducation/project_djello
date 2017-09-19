import React, { Component } from "react";
import ListContainer from "../containers/ListContainer";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

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

	changeBoard = (e, index, value) => {
		this.setState({ currentBoard: value });
	};

	addOrDeleteBoard = async (type, id) => {
		await this.props[type](id);
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
				<div className="board-title-grid">
					<div className="board-title">
						<h2>
							{this.state.currentBoard === null ? null : (
								this.props.boards[this.state.currentBoard].title
							)}
						</h2>
					</div>
					<div className="select-board">
						<div className="select-board-dropdown">
							<SelectField
								id="boardSelector"
								value={this.state.currentBoard}
								onChange={this.changeBoard}
							>
								{!this.props.boards ? null : (
									this.props.boards.map((board, i) => (
										<MenuItem
											key={i}
											id={`board-${i}`}
											primaryText={board.title}
											value={i}
										/>
									))
								)}
							</SelectField>
						</div>
						<div>
							<a
								href=""
								onClick={e => {
									e.preventDefault();
									this.addOrDeleteBoard("createBoard", this.props.user.id);
								}}
							>
								Add a board
							</a>
						</div>
						<div>
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
						</div>
					</div>
				</div>
				<div className="grid-container">
					{this.state.currentBoard === null ? null : (
						this.props.boards[this.state.currentBoard].Lists.map(list => (
							<ListContainer
								key={list.id}
								id={list.id}
								boardId={list.boardId}
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
