import React from "react";
import Board from "./Board";

const Dashboard = ({ board }) => {
	return (
		<div>
			{!board ? null : <Board title={board.title} lists={board.Lists} />}
		</div>
	);
};

export default Dashboard;
