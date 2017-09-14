import React from "react";
import List from "./List";

const Board = ({ title, lists }) => {
	return (
		<div>
			<h2>{title}</h2>

			{lists.map(list => <List title={list.title} cards={list.cards} />)}
		</div>
	);
};

export default Board;
