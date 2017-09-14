import React from "react";
import Board from "./Board";
import fetch from "isomorphic-fetch";

const Dashboard = ({ boards }) => {
	return (
		<div>
			{boards.map(board => <Board title={board.title} lists={board.lists} />)}
		</div>
	);
};

export default Dashboard;
