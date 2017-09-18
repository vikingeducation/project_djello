import React from "react";
import Paper from "material-ui/Paper";
import Card from "./Card";

const List = ({ title, cards }) => {
	return (
		<Paper className="list">
			<h2>{title}</h2>

			{!cards.length ? null : (
				cards.map(card => <Card key={card.id} card={card} />)
			)}
			<a href="">Add a Card</a>
		</Paper>
	);
};

export default List;
