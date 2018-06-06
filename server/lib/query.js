const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');

function getListsCards(lists) {

	let promises = [];

	lists.forEach(list => {
		promises.push(getListCards(list));
	});

	return promises;

}


function getListCards(list) {
	
	const { _id, title, boardId, description, position, completed } = list;

	return Card
		.find({ listId: list._id })
		.then(cards => {
			return {
				_id,
				title,
				boardId,
				description,
				position,
				completed,
				cards
			};
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

function getBoardLists(board) {

	const { _id, title, userId, members } = board;

	return List
		.find({ boardId: board._id })
		.then(lists => {
			return {
				_id,
				title,
				userId,
				members,
				lists
			}
		})
		.catch(e => {
			return new Error(e.stack);
		})
}


function getBoardData(boardId) {

	return Board
		.findById({ _id: boardId })
		.then(board => {
			return getBoardLists(board)

		.then(board => {
		
			return Promise
					.all(getListsCards(board.lists))
					.then(updatedList => {
						return {
							...board,
							lists: updatedList
						}
					})
		})
		.then(formattedBoard => {
			return formattedBoard;
		});
	});
}

module.exports = {
	getListCards,
	getListsCards,
	getBoardLists,
	getBoardData
}