import React from 'react';
import ListContainer from '../list/ListContainer'

const Board = (props) => {

	const { board } = props;

	return (
		<div>
			<p>Board: { board._id }</p>
			<div className="row">
			{ board.lists.map(list => (
				<div key={list} className="col-4">
					<ListContainer listId={list} />
				</div>
			))}
			</div>
		</div>
	)
}

export default Board;