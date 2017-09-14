import React from "react";
import List from "./List";

const Board = ({ title, lists }) => {
	return (
		<div>
			<h2>{title}</h2>

			<div className="grid-container">
				{lists.map(list => (
					<List key={list.id} title={list.title} cards={list.Cards} />
				))}
			</div>
		</div>
	);
};

export default Board;
