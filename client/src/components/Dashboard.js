import React from "react";
import Board from "./Board";

const Dashboard = ({ boards }) => {
	return (
		<div>
			{boards.map(board => <Board title={board.title} lists={board.lists} />)}
		</div>
	);
};

export default Dashboard;
