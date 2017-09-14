import React from "react";
import { Card as CardDisplay, CardHeader, CardText } from "material-ui/Card";

const Card = ({ card }) => {
	return (
		<CardDisplay>
			<CardHeader title={card.title} showExpandableButton={true} />
			<CardText>{card.description}</CardText>
			<CardText expandable={true}>Testing to see if this works...</CardText>
		</CardDisplay>
	);
};

export default Card;
