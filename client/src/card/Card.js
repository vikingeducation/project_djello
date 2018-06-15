import React from 'react';


const Card = (props) => {
	
	const { card } = props;

	return (
		<div>
			<p>Card: {card._id}</p>
		</div>
		)
}

export default Card;