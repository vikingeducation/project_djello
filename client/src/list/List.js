import React from 'react'
import CardContainer from '../card/CardContainer'

const List = (props) => {

	const { list } = props;

	return (
		<div>
			<p>List: { list._id }</p>

			{ list.cards.map(card => (
				<CardContainer key={card} cardId={card} />
			))}
		</div>
	)
}

export default List;