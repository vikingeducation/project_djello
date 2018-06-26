import React from 'react';
import CardDelete from './CardDelete'
import CardModalContainer from './CardModalContainer'
import CardModal from './CardModal'


const Card = (props) => {
	
	const { card, listId } = props;

	return (
		
			<CardModalContainer cardId={card._id} listId={listId} />
		
		)
}

export default Card;