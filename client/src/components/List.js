import React from "react";
import Paper from "material-ui/Paper";
import Card from "./Card";

const List = ({ title, cards }) => {
	return (
		<Paper className="list">
			<h2>{title}</h2>

			{cards.map(card => <Card key={card.id} card={card} />)}
		</Paper>
	);
};

export default List;
