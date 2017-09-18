import React from "react";
import Paper from "material-ui/Paper";

const Card = ({ card, deleteCard }) => {
	return (
		<Paper className="card">
			<h4>{card.title}</h4>
			<button
				href=""
				className="close-button"
				onClick={e => {
					e.preventDefault();
					deleteCard(card.id);
				}}
			>
				&times;
			</button>
			<p>{card.description}</p>
		</Paper>
	);
};

export default Card;
