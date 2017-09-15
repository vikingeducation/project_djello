import React from "react";
import List from "./List";

const Dashboard = ({ currentBoard, boards, onChange }) => {
	return (
		<div>
			<h2>{currentBoard ? currentBoard.title : null}</h2>

			<select onChange={onChange}>
				{!boards ? null : (
					boards.map((board, i) => (
						<option key={i} value={i}>
							{board.title}
						</option>
					))
				)}
			</select>
			<div className="grid-container">
				{!currentBoard ? null : (
					currentBoard.Lists.map(list => (
						<List key={list.id} title={list.title} cards={list.Cards} />
					))
				)}
			</div>
		</div>
	);
};

export default Dashboard;
