import React from 'react';
import ListContainer from '../list/ListContainer'

const Board = (props) => {

	const { board } = props;

	return (
		<div>
			<p>Board: { board._id }</p>

			{ board.lists.map(list => (
				<ListContainer key={list} listId={list} />
			))}
		</div>
	)
}

export default Board;