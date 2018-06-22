import React from 'react'
import CardContainer from '../card/CardContainer'
import ListDelete from './ListDelete'
import ListUpdate from './ListUpdate'
import CardCreate from '../card/CardCreate'

const List = (props) => {

	const { list, handleClick } = props;

	return (
		<div>
			<p>List: { list._id }</p>
			<ListDelete list={list} />
			<ListUpdate list={list} />
			<CardCreate listId={list._id} />
			{ list.cards.map(card => (
				<CardContainer key={card} cardId={card} listId={list._id}/>
			))}
		</div>
	)
}

export default List;