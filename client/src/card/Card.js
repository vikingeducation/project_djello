import React from 'react';
import CardDelete from './CardDelete'
import CardModalContainer from './CardModalContainer'
import CardModal from './CardModal'


const Card = (props) => {
	
	const { card, listId } = props;

	return (
		<div>
			<p>Card: {card._id}</p>
			<CardModalContainer cardId={card._id} listId={listId} />
			<CardDelete cardId={card._id} />
		</div>
		)
}

export default Card;