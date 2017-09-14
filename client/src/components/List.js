import React from "react";
import Card from "./Card";

const List = ({ title, cards }) => {
	return (
		<div>
			<h2>{title}</h2>

			{cards.map(card => <Card data={card} />)}
		</div>
	);
};

export default List;
